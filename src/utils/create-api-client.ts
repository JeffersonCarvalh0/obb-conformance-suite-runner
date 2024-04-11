import axios from "axios";
import https from "https";
import type {
  AnyObject,
  ConformanceOptions,
  PlanOptions,
  ConformanceApiClient,
} from "../types";
import { createPlan } from "../conformance-api/plan/create-plan";
import { getPlanInfo } from "../conformance-api/plan/get-plan-info";
import { createRunner } from "../conformance-api/runner/create-runner";
import { getRunnerStatus } from "../conformance-api/runner/get-runner-status";
import { visitUrl } from "../conformance-api/runner/visit-url";
import { getModuleInfo } from "../conformance-api/test-module/get-module-info";
import { sendCallback } from "../conformance-api/test-module/send-callback";
import { getRunnerLogs } from "../conformance-api/runner/get-runner-logs";

export const createApiClient = (
  options: ConformanceOptions,
): ConformanceApiClient => {
  const { conformanceUrl, token } = options;

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const axiosInstance = axios.create({
    baseURL: conformanceUrl,
    httpsAgent,
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });

  return {
    createPlan: <T extends AnyObject>(planOptions: PlanOptions<T>) =>
      createPlan(axiosInstance, planOptions),
    getPlanInfo: (planId) => getPlanInfo(axiosInstance, planId),
    createRunner: (planId, planTestModule) =>
      createRunner(axiosInstance, planId, planTestModule),
    getRunnerStatus: (runnerId) => getRunnerStatus(axiosInstance, runnerId),
    visitUrl: (runnerId, url) => visitUrl(axiosInstance, runnerId, url),
    getModuleInfo: (runnerId) => getModuleInfo(axiosInstance, runnerId),
    sendCallback: (callbackUrl) => sendCallback(callbackUrl),
    getRunnerLogs: (runnerId) => getRunnerLogs(axiosInstance, runnerId),
    axiosInstance,
  };
};
