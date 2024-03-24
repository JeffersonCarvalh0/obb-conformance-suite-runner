import { AxiosInstance } from "axios";
import { ConformanceOptions } from "./conformance-options";

export type ConformanceContext = ConformanceOptions & {
  apiClient: AxiosInstance;
};
