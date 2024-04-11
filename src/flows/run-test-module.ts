import type {
  PlanTestModule,
  TestModuleStatus,
  ConformanceContext,
  RunnerContext,
  OverrideOptions,
  AuthorizationFlow,
} from "../types";
import { sleep } from "../utils/sleep";
import { sendCallback } from "../conformance-api/test-module/send-callback";
import { logger } from "../logger";

export const runTestModule = async (
  context: ConformanceContext,
  planId: string,
  testModule: PlanTestModule,
  testOverride?: OverrideOptions,
) => {
  const { authorizer, apiClient } = context;

  const { id } = await apiClient.createRunner(planId, testModule);

  let moduleInfo = await apiClient.getModuleInfo(id);

  const finalStatuses: TestModuleStatus[] = [
    "FINISHED",
    "INTERRUPTED",
    "REVIEW",
  ];

  logger.info("Starting test polling");

  while (!finalStatuses.includes(moduleInfo.status)) {
    logger.info("Test status", { status: moduleInfo.status });

    const {
      browser: { urls, visited },
    } = await apiClient.getRunnerStatus(id);

    const runnerContext: RunnerContext = {
      apiClient,
      status: moduleInfo.status,
      testId: id,
      testName: testModule.testModule,
      urls,
      visitedUrls: visited,
    };

    if (urls.length) {
      logger.info("Visiting authorization URL");

      let interactionCookies = await authorizer.startInteraction(
        urls[0],
        runnerContext,
      );

      await apiClient.visitUrl(id, urls[0]);

      logger.info("Interaction started");

      interactionCookies = await authorizer.login(
        interactionCookies,
        runnerContext,
      );

      logger.info("Signed in successfully");

      let flow: AuthorizationFlow = "confirm";

      if (testOverride?.interactions?.length) {
        flow = testOverride.interactions.shift() as AuthorizationFlow;
      }

      let callbackUrl: string;

      if (flow === "confirm") {
        callbackUrl = await authorizer.confirm(
          interactionCookies,
          runnerContext,
        );
      } else {
        callbackUrl = await authorizer.abort(interactionCookies, runnerContext);
      }

      logger.info(`Consent ${flow}ed`);

      await sendCallback(callbackUrl);
    }

    if (!finalStatuses.includes(moduleInfo.status)) {
      await sleep(3000);

      moduleInfo = await apiClient.getModuleInfo(id);
    }
  }

  logger.info("Test finished", {
    id,
    name: testModule.testModule,
    status: moduleInfo.status,
    result: moduleInfo.result,
  });
};
