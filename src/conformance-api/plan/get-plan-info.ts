import { AxiosInstance } from "axios";
import { PlanInfoResponse } from "../../types";

export const getPlanInfo = async (apiClient: AxiosInstance, planId: string) => {
  const { data } = await apiClient.get<PlanInfoResponse>(`/api/plan/${planId}`);

  return data;
};
