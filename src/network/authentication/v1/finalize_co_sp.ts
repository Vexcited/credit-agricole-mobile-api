import { v4 as uuidv4 } from "uuid";

import { APP_ANDROID_VERSION } from "~/constants/app";
import { PHONE_IDENTIFIER } from "~/constants/phone-identifier";
import { Tokens } from "~/definitions";

export async function postAuthenticationV1FinalizeCoSp (structureId: string, pivotId: string, authSessionId: string): Promise<null | Tokens> {
  const response = await fetch(`https://nmb.credit-agricole.fr/authentication/v1/finalize_co_sp/${structureId}`, {
    body: JSON.stringify({
      auth_session_id: authSessionId,
      pivot_id: pivotId
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      correlationId: uuidv4(),
      hashId: PHONE_IDENTIFIER,
      structureId,
      "User-Agent": `MaBanque/${APP_ANDROID_VERSION}`
    },
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("Unknown error when retaining device.");
  }

  const json = await response.json();

  if ("status" in json) {
    // status = "IN_PROGRESS"
    return null;
  }

  return json;
}
