import { apiClient } from "../../services/api-client";
import { PlanTestModule, RunnerCreatedResponse } from "../../types";
import { stringifyParam } from "../../utils/stringify-param";

export const createRunner = async (planId: string, module: PlanTestModule) => {
  const { testModule, variant } = module;

  console.log("Creating runner");

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

  console.log(`${module.testModule} started`);

  return data;
};
