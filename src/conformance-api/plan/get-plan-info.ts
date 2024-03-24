import { ConformanceContext, PlanInfoResponse } from "../../types";

export const getPlanInfo = async (
  context: ConformanceContext,
  planId: string,
) => {
  const { data } = await context.apiClient.get<PlanInfoResponse>(
    `/api/plan/${planId}`,
  );

  return data;
};
