import { v4 as uuidv4 } from "uuid";

import { APP_ANDROID_VERSION } from "~/constants/app";
import { PHONE_IDENTIFIER } from "~/constants/phone-identifier";

export async function postAuthenticationV1ScadRetainDeviceFirstCo (structureId: string, pivotId: string, authSessionId: string, login: string): Promise<void> {
  const response = await fetch(`https://nmb.credit-agricole.fr/authentication/v1/keypad/${structureId}`, {
    body: JSON.stringify({
      auth_session_id: authSessionId,
      login,
      pivot_id: pivotId,
      structure_id: structureId
    }),
    headers: {
      authSessionId,
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
}
