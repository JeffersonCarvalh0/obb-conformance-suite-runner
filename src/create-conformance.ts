import axios from "axios";
import https from "https";
import { createPlan } from "./conformance-api/plan/create-plan";
import { createAndRunPlan } from "./flows/create-and-run-plan";
import { runExistingPlan } from "./flows/run-existing-plan";
import {
  AnyObject,
  ConformanceOptions,
  PlanOptions,
  ConformanceContext,
} from "./types";

export const createConformance = (options: ConformanceOptions) => {
  const { conformanceUrl, token } = options;

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const apiClient = axios.create({
    baseURL: conformanceUrl,
    httpsAgent,
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });

  const context: ConformanceContext = {
    ...options,
    apiClient,
  };

  return {
    createPlan: <T extends AnyObject>(planOptions: PlanOptions<T>) =>
      createPlan(context, planOptions),
    createAndRun: <T extends AnyObject>(planOptions: PlanOptions<T>) =>
      createAndRunPlan(context, planOptions),
    runExisting: async (planId: string) => runExistingPlan(context, planId),
  };
};
