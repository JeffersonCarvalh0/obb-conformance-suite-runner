import type {
  PlanTestModule,
  ConformanceContext,
  RunnerContext,
  OverrideOptions,
  AuthorizationFlow,
  RunnerOptions,
  TestModuleStatus,
} from "../types";
import { sleep } from "../utils/sleep";
import { sendCallback } from "../conformance-api/test-module/send-callback";
import { logger } from "../logger";
import { finalStatuses } from "../constants/final-statuses";
import { eventEmitter } from "../eventEmitter";

export const runTestModule = async (
  context: ConformanceContext,
  planId: string,
  testModule: PlanTestModule,
  runnerOptions: RunnerOptions,
  testOverride?: OverrideOptions,
) => {
  const { authorizer, apiClient } = context;

  const { id } = await apiClient.createRunner(planId, testModule);

  let previousStatus: TestModuleStatus | undefined;
  let moduleInfo = await apiClient.getModuleInfo(id);

  logger.info("Starting test polling");
  eventEmitter.emit("testModuleStart", moduleInfo);

  if (moduleInfo.status === "INTERRUPTED") {
    eventEmitter.emit("testModuleError", moduleInfo);

    if (runnerOptions.bail) {
      throw new Error("Test failed");
    }
  }

  while (!finalStatuses.includes(moduleInfo.status)) {
    logger.info("Test status", { status: moduleInfo.status });

    if (previousStatus !== moduleInfo.status) {
      eventEmitter.emit("testModuleUpdate", moduleInfo);
      previousStatus = moduleInfo.status;
    }

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

      let callbackUrl: string;

      const interactionResult = await authorizer.startInteraction(
        urls[0],
        runnerContext,
      );

      await apiClient.visitUrl(id, urls[0]);

      logger.info("Interaction started");

      if (interactionResult.includes("http")) {
        logger.info("Authorization interrupted, sending callback");

        callbackUrl = interactionResult;

        await sendCallback(callbackUrl);
      } else {
        const interactionCookies = await authorizer.login(
          interactionResult,
          runnerContext,
        );

        logger.info("Signed in successfully");

        let flow: AuthorizationFlow = "confirm";

        if (testOverride?.interactions?.length) {
          flow = testOverride.interactions.shift() as AuthorizationFlow;
        }

        if (flow === "confirm") {
          callbackUrl = await authorizer.confirm(
            interactionCookies,
            runnerContext,
          );
        } else {
          callbackUrl = await authorizer.abort(
            interactionCookies,
            runnerContext,
          );
        }

        logger.info(`Consent ${flow}ed`);

        await sendCallback(callbackUrl);
      }
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

  eventEmitter.emit("testModuleFinish", moduleInfo);
};
