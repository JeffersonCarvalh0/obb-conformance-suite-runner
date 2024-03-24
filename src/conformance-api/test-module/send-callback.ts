import axios from "axios";
import https from "https";
import { logger } from "../../logger";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const sendCallback = async (callbackUrl: string) => {
  const { data } = await axios.get<string>(callbackUrl, {
    httpsAgent,
  });

  logger.trace("Got conformance callback page");

  const implictFlowUrl = data?.match(/xhr\.open\('POST', "(.*?)", true\)/)?.[1];

  logger.trace("Implicit flow url", { implictFlowUrl });

  if (!implictFlowUrl) {
    throw new Error("No implicit flow url found");
  }

  const fragment = callbackUrl.split("#")[1];

  await axios.post(implictFlowUrl, `#${fragment}`, {
    httpsAgent,
    headers: {
      "Content-Type": "text/plain",
    },
  });

  logger.info("Callback sent");
};
