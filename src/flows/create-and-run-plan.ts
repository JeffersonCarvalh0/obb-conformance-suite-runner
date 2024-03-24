/* eslint-disable no-await-in-loop */
import { createPlan } from "../conformance-api/plan/create-plan";
import { logger } from "../logger";
import { AnyObject, ConformanceContext, PlanOptions } from "../types";
import { sleep } from "../utils/sleep";
import { runTestModule } from "./run-test-module";

export const createAndRunPlan = async <T extends AnyObject>(
  context: ConformanceContext,
  planOptions: PlanOptions<T>,
) => {
  const { id, modules } = await createPlan(context, planOptions);

  logger.info(
    `Plan created, visit ${context.conformanceUrl}/plan-detail.html?plan=${id}. Test starting in 5 seconds...`,
  );

  await sleep(5000);

  for (const module of modules) {
    await runTestModule(context, id, module);
  }

  logger.info("Plan completed!");
};
