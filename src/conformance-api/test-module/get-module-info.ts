import { AxiosInstance } from "axios";
import { TestModuleInfoResponse } from "../../types";

export const getModuleInfo = async (
  apiClient: AxiosInstance,
  runnerId: string,
) => {
  const { data } = await apiClient.get<TestModuleInfoResponse>(
    `/api/info/${runnerId}`,
  );

  return data;
};
