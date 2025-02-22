import { v4 as uuidv4 } from "uuid";

import type { UserSummary } from "~/definitions";

import { APP_ANDROID_VERSION } from "~/constants/app";
import { BASE_URL } from "~/constants/endpoints";
import { ExpiredTokenError } from "~/constants/errors";
import { retrieveHashFromAccessToken } from "~/core/retrieve-hash";

export async function getSyntheseV1Client (accessToken: string): Promise<UserSummary> {
  const response = await fetch(`${BASE_URL}/synthese/v1/client`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      correlationId: uuidv4(),
      hashId: retrieveHashFromAccessToken(accessToken),
      "User-Agent": `MaBanque/${APP_ANDROID_VERSION}`
    }
  });

  const json = await response.json();

  if (!response.ok && "code" in json) {
    switch (json.code) {
      case "expired_token": throw new ExpiredTokenError(json.cause);
    }
  }

  return json;
}
