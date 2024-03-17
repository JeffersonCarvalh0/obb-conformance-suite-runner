import { apiClient } from "../../services/api-client";
import { PlanInfoResponse } from "../../types";

export const getPlanInfo = async (planId: string) => {
  const { data } = await apiClient.get<PlanInfoResponse>(`/api/plan/${planId}`);

  return data;
};
