import { AxiosInstance } from "axios";
import { logger } from "../../logger";
import { PlanTestModule, RunnerCreatedResponse } from "../../types";
import { stringifyParam } from "../../utils/stringify-param";

export const createRunner = async (
  apiClient: AxiosInstance,
  planId: string,
  planTestModule: PlanTestModule,
) => {
  const { testModule, variant } = planTestModule;

  logger.trace("Creating runner");

  const { data } = await apiClient.post<RunnerCreatedResponse>(
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

  logger.info(`${testModule} started`, {
    testId: data.id,
    variant,
  });

  return data;
};
