import { AxiosInstance } from "axios";
import { RunnerStatusResponse } from "../../types";

export const getRunnerStatus = async (
  apiClient: AxiosInstance,
  runnerId: string,
) => {
  const { data } = await apiClient.get<RunnerStatusResponse>(
    `/api/runner/${runnerId}`,
  );

  return data;
};
