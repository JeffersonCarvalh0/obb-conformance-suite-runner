import { AxiosInstance } from "axios";
import type { TestLogResponse } from "../../types";

export const getRunnerLogs = async (
  apiClient: AxiosInstance,
  runnerId: string,
) => {
  const { data } = await apiClient.get<TestLogResponse[]>(
    `/api/logs/${runnerId}`,
  );

  return data;
};
