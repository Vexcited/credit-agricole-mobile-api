import { v4 as uuidv4 } from "uuid";

import type { Category } from "~/definitions/category";

import { APP_ANDROID_VERSION } from "~/constants/app";
import { BadCredentialsError, ExpiredTokenError, TechnicalError } from "~/constants/errors";
import { retrieveHashFromAccessToken } from "~/core/retrieve-hash";

/**
 * Retrieve the full list of categories for the categorisation.
 */
export async function getCategorisationV1FullCategories (accessToken: string, structureId: string): Promise<Array<Category>> {
  const response = await fetch("https://nmb.credit-agricole.fr/categorisation/v1/fullCategories", {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      correlationId: uuidv4(),
      hashId: retrieveHashFromAccessToken(accessToken),
      structureId,
      "User-Agent": `MaBanque/${APP_ANDROID_VERSION}`
    }
  });

  const json = await response.json();

  if (!response.ok && "code" in json) {
    switch (json.code) {
      case "technical_error": throw new TechnicalError(json.cause);
      case "bad_credentials": throw new BadCredentialsError(json.cause);
      case "expired_token": throw new ExpiredTokenError(json.cause);
    }
  }

  return json;
}
