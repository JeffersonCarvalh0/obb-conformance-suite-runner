import { logger } from "../logger";
import type { ConformanceContext, FlowOverride } from "../types";
import { runTestModule } from "./run-test-module";

export const runExistingPlan = async (
  context: ConformanceContext,
  planId: string,
  override: FlowOverride = {},
) => {
  const { modules } = await context.apiClient.getPlanInfo(planId);

  for (const currentModule of modules) {
    await runTestModule(
      context,
      planId,
      currentModule,
      override[currentModule.testModule],
    );
  }

  logger.info("Plan completed!");
};
