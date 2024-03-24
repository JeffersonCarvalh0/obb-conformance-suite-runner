import { ConformanceContext, RunnerStatusResponse } from "../../types";

export const getRunnerStatus = async (
  context: ConformanceContext,
  runnerId: string,
) => {
  const { data } = await context.apiClient.get<RunnerStatusResponse>(
    `/api/runner/${runnerId}`,
  );

  return data;
};
