import { v4 as uuidv4 } from "uuid";

import type { Tokens } from "~/definitions";

import { APP_ANDROID_VERSION } from "~/constants/app";
import { TEMPORARY_PHONE_IDENTIFIER } from "~/constants/phone-identifier";
import { retrieveHashFromAccessToken } from "~/core/retrieve-hash";

/**
 * Retrieve the full list of categories for the categorisation.
 */
export async function postAuthenticationV1RefreshToken (expiredAccessToken: string, refreshToken: string): Promise<Tokens> {
  if (retrieveHashFromAccessToken(refreshToken))
    throw new Error("You gave an access token instead of a refresh token.");

  const response = await fetch("https://nmb.credit-agricole.fr/authentication/v1/refresh_token", {
    body: JSON.stringify({
      refresh_token: refreshToken
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      correlationId: uuidv4(),
      hashId: retrieveHashFromAccessToken(expiredAccessToken),
      "User-Agent": `MaBanque/${APP_ANDROID_VERSION}`
    },
    method: "POST"
  });

  return response.json();
}
