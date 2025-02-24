import { v4 as uuidv4 } from "uuid";

import type { FutureTransfer } from "~/definitions";

import { APP_ANDROID_VERSION } from "~/constants/app";
import { BASE_URL } from "~/constants/endpoints";
import { AccessDeniedError, BadCredentialsError, ContractNumberNotAuthorizedError, ExpiredTokenError, TechnicalError } from "~/constants/errors";
import { retrieveHashFromAccessToken } from "~/core/retrieve-hash";

export async function getFutureOperationV1FutureTransfers(accessToken: string, contractNumber: string): Promise<{
  future_transfers: Array<FutureTransfer>
  total_amount: number
}> {
  const response = await fetch(`${BASE_URL}/futureoperation/v1/future_transfers/${contractNumber}`, {
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
      case "technical_error": throw new TechnicalError(json.cause);
      case "bad_credentials": throw new BadCredentialsError(json.cause);
      case "expired_token": throw new ExpiredTokenError(json.cause);
      case "access_denied": throw new AccessDeniedError(json.cause);
      case "contractNumber_not_authorized": throw new ContractNumberNotAuthorizedError(json.cause);
    }
  }

  return json;
}
