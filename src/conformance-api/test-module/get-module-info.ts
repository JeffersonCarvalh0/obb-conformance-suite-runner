import { ConformanceContext, TestModuleInfoResponse } from "../../types";

export const getModuleInfo = async (
  context: ConformanceContext,
  runnerId: string,
) => {
  const { data } = await context.apiClient.get<TestModuleInfoResponse>(
    `/api/info/${runnerId}`,
  );

  return data;
};
