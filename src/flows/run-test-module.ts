/* eslint-disable no-await-in-loop */
import { createRunner } from "../conformance-api/runner/create-runner";
import { getRunnerStatus } from "../conformance-api/runner/get-runner-status";
import { getModuleInfo } from "../conformance-api/test-module/get-module-info";
import { PlanTestModule, TestModuleStatus, Authorizer } from "../types";
import { sleep } from "../utils/sleep";
import { visitUrl } from "../conformance-api/runner/visit-url";
import { sendCallback } from "../conformance-api/test-module/send-callback";

export const runTestModule = async (
  planId: string,
  module: PlanTestModule,
  authorizer: Authorizer,
) => {
  const { id } = await createRunner(planId, module);

  let moduleInfo = await getModuleInfo(id);

  const finalStatuses: TestModuleStatus[] = [
    "FINISHED",
    "INTERRUPTED",
    "REVIEW",
  ];

  console.log("Starting test polling");

  while (!finalStatuses.includes(moduleInfo.status)) {
    moduleInfo = await getModuleInfo(id);

    console.log("Test status", moduleInfo.status);

    const {
      browser: { urls },
    } = await getRunnerStatus(id);

    if (urls.length) {
      console.log("Visiting authorization URL");

      let interactionCookies = await authorizer.startInteraction(urls[0]);

      console.log("Interaction started");

      await visitUrl(id, urls[0]);

      interactionCookies = await authorizer.login(interactionCookies);

      console.log("Logged in");

      const callbackUrl = await authorizer.confirm(interactionCookies);

      console.log("Consent confirmed");

      await sendCallback(callbackUrl);
    }

    if (!finalStatuses.includes(moduleInfo.status)) {
      await sleep(3000);
    }
  }

  console.log("Test finished", {
    id,
    name: module.testModule,
    status: moduleInfo.status,
    result: moduleInfo.result,
  });
};
