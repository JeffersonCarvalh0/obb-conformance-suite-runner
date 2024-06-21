import type {
  PlanTestModule,
  ConformanceContext,
  RunnerContext,
  OverrideOptions,
  AuthorizationFlow,
  RunnerOptions,
} from "../types";
import { sleep } from "../utils/sleep";
import { sendCallback } from "../conformance-api/test-module/send-callback";
import { logger } from "../logger";
import { finalStatuses } from "../constants/final-statuses";

export const runTestModule = async (
  context: ConformanceContext,
  planId: string,
  testModule: PlanTestModule,
  runnerOptions: RunnerOptions,
  testOverride?: OverrideOptions,
) => {
  const { authorizer, apiClient } = context;

  const { id } = await apiClient.createRunner(planId, testModule);

  let moduleInfo = await apiClient.getModuleInfo(id);

  logger.info("Starting test polling");

  if (runnerOptions.bail && moduleInfo.status === "INTERRUPTED") {
    throw new Error("Test failed");
  }

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

    if (testOverride?.custom) {
      const customOverrideResults = await Promise.all(
        testOverride.custom.map((custom) => custom(runnerContext)),
      );

      // eslint-disable-next-line no-param-reassign
      testOverride.custom = testOverride.custom.filter(
        (_, i) => !customOverrideResults[i],
      );
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
