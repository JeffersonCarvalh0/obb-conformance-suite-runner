import { AxiosInstance } from "axios";
import { PlanInfoResponse } from "../../types";

export const getAvailablePlans = async (apiClient: AxiosInstance) => {
  const { data } =
    await apiClient.get<PlanInfoResponse[]>(`/api/plan/available`);

  return data;
};
