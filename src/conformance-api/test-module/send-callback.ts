import parse from "node-html-parser";
import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const sendCallback = async (callbackUrl: string) => {
  const { data } = await axios.get<string>(callbackUrl, {
    httpsAgent,
  });

  console.log("Got conformance callback page");

  const document = parse(data);

  const scriptTag = document.getElementsByTagName("script").at(-1);

  const implictFlowUrl = scriptTag?.innerText?.match(
    /xhr\.open\('POST', "(.*?)", true\)/,
  )?.[1];

  console.log("Implicit flow url", implictFlowUrl);

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

  console.log("Callback sent");
};
