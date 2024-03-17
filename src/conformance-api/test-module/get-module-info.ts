import { apiClient } from "../../services/api-client";
import { TestModuleInfoResponse } from "../../types";

export const getModuleInfo = async (runnerId: string) => {
  const { data } = await apiClient.get<TestModuleInfoResponse>(
    `/api/info/${runnerId}`,
  );

  return data;
};
