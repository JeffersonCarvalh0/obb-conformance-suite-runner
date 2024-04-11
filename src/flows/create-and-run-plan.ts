import { logger } from "../logger";
import type {
  AnyObject,
  ConformanceContext,
  PlanOptions,
  FlowOverride,
} from "../types";
import { sleep } from "../utils/sleep";
import { runTestModule } from "./run-test-module";

export const createAndRunPlan = async <T extends AnyObject>(
  context: ConformanceContext,
  planOptions: PlanOptions<T>,
  override: FlowOverride = {},
) => {
  const { id, modules } = await context.apiClient.createPlan(planOptions);

  logger.info(
    `Plan created, visit ${context.conformanceUrl}/plan-detail.html?plan=${id}. Test starting in 5 seconds...`,
  );

  await sleep(5000);

  for (const currentModule of modules) {
    await runTestModule(
      context,
      id,
      currentModule,
      override[currentModule.testModule],
    );
  }

  logger.info("Plan completed!");
};
