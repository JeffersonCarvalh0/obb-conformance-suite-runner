import { apiClient } from "../../services/api-client";
import { RunnerStatusResponse } from "../../types";

export const getRunnerStatus = async (runnerId: string) => {
  const { data } = await apiClient.get<RunnerStatusResponse>(
    `/api/runner/${runnerId}`,
  );

  return data;
};
