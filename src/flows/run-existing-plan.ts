/* eslint-disable no-await-in-loop */
import { getPlanInfo } from "../conformance-api/plan/get-plan-info";
import { logger } from "../logger";
import { ConformanceOptions } from "../types";
import { runTestModule } from "./run-test-module";

export const runExistingPlan = async (
  conformanceOptions: ConformanceOptions,
  planId: string,
) => {
  const { modules } = await getPlanInfo(planId);

  for (const module of modules) {
    await runTestModule(planId, module, conformanceOptions.authorizer);
  }

  logger.info("Plan completed!");
};
