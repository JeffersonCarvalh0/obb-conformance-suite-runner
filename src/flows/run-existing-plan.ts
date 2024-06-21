import { logger } from "../logger";
import type { ConformanceContext, FlowOverride, RunnerOptions } from "../types";
import { filterSkippedTests } from "../utils/filter-skipped-tests";
import { runTestModule } from "./run-test-module";

export const runExistingPlan = async (
  context: ConformanceContext,
  planId: string,
  options?: Partial<RunnerOptions>,
  override: FlowOverride = {},
) => {
  const runnerOptions = {
    skipPassed: options?.skipPassed ?? true,
    skipReview: options?.skipReview ?? true,
    skipWarning: options?.skipWarning ?? true,
    skipFailed: options?.skipFailed ?? false,
    bail: options?.bail ?? false,
  };

  const { modules } = await context.apiClient.getPlanInfo(planId);

  const filteredModules = await filterSkippedTests(
    context.apiClient,
    modules,
    runnerOptions,
  );

  for (const currentModule of filteredModules) {
    await runTestModule(
      context,
      planId,
      currentModule,
      runnerOptions,
      override[currentModule.testModule],
    );
  }

  logger.info("Plan completed!");
};
