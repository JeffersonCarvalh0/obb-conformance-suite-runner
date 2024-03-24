import { logger } from "../../logger";
import {
  ConformanceContext,
  PlanTestModule,
  RunnerCreatedResponse,
} from "../../types";
import { stringifyParam } from "../../utils/stringify-param";

export const createRunner = async (
  context: ConformanceContext,
  planId: string,
  module: PlanTestModule,
) => {
  const { testModule, variant } = module;

  logger.trace("Creating runner");

  const { data } = await context.apiClient.post<RunnerCreatedResponse>(
    `/api/runner?plan=${planId}&test=${testModule}`,
    undefined,
    {
      params: {
        variant: stringifyParam(variant),
      },
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  logger.info(`${module.testModule} started`, {
    testId: data.id,
    variant: module.variant,
  });

  return data;
};
