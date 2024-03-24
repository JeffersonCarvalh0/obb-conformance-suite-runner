/* eslint-disable no-await-in-loop */
import { getPlanInfo } from "../conformance-api/plan/get-plan-info";
import { logger } from "../logger";
import { ConformanceContext } from "../types";
import { runTestModule } from "./run-test-module";

export const runExistingPlan = async (
  context: ConformanceContext,
  planId: string,
) => {
  const { modules } = await getPlanInfo(context, planId);

  for (const module of modules) {
    await runTestModule(context, planId, module);
  }

  logger.info("Plan completed!");
};
