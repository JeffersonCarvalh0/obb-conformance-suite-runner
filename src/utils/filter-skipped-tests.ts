import { logger } from "../logger";
import type { ConformanceApiClient } from "../types/conformance-api-client";
import type { PlanTestModule } from "../types/responses/plan-info";
import type { RunnerOptions } from "../types/runner-options";

export const filterSkippedTests = async (
  apiClient: ConformanceApiClient,
  modules: PlanTestModule[],
  runnerOptions: RunnerOptions,
) => {
  const modulesInfo = await Promise.all(
    modules
      .filter(({ instances }) => !!instances.length)
      .map((module) =>
        apiClient.getModuleInfo(module.instances.at(-1) as string),
      ),
  );

  const skippedTests = modulesInfo
    .filter(
      ({ status, result }) => status === "FINISHED" && result === "SKIPPED",
    )
    .map(({ testName }) => testName);

  if (runnerOptions.skipPassed) {
    skippedTests.push(
      ...modulesInfo
        .filter(({ result }) => result === "PASSED")
        .map(({ testName }) => testName),
    );

    logger.debug("Skipping passed tests");
  }

  if (runnerOptions.skipReview) {
    skippedTests.push(
      ...modulesInfo
        .filter(
          ({ status, result }) => status === "FINISHED" && result === "REVIEW",
        )
        .map(({ testName }) => testName),
    );

    logger.debug("Skipping review tests");
  }

  if (runnerOptions.skipWarning) {
    skippedTests.push(
      ...modulesInfo
        .filter(
          ({ status, result }) => status === "FINISHED" && result === "WARNING",
        )
        .map(({ testName }) => testName),
    );

    logger.debug("Skipping warning tests");
  }

  if (!skippedTests.length) {
    logger.debug("No tests to skip");

    return modules;
  }

  logger.debug(`Skipped ${skippedTests.length} tests`);

  return modules.filter(({ testModule }) => !skippedTests.includes(testModule));
};
