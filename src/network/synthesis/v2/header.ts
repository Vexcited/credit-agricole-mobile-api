import { v4 as uuidv4 } from "uuid";

import type { Account } from "~/definitions";

import { APP_ANDROID_VERSION } from "~/constants/app";
import { BASE_URL } from "~/constants/endpoints";
import { retrieveHashFromAccessToken } from "~/core/retrieve-hash";

export type SynthesisHeader = {
  future_card_operations: {
    number: number
    status: "ENABLED" | "NO_DATA"
  }
  future_transfers: {
    number: number
    status: "ENABLED" | "NO_DATA"
  }
  header: {
    balance: number
    currency: string
    holder: string
    label: string
  }
};

export async function getSynthesisV2Header(accessToken: string, contractNumber: string): Promise<SynthesisHeader> {
  const response = await fetch(`${BASE_URL}/synthesis/v2/header/${contractNumber}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      correlationId: uuidv4(),
      hashId: retrieveHashFromAccessToken(accessToken),
      "User-Agent": `MaBanque/${APP_ANDROID_VERSION}`
    }
  });

  return response.json();
}
