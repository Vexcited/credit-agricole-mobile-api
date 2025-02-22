import { v4 as uuidv4 } from "uuid";

import type { Structure } from "~/definitions";

import { APP_ANDROID_VERSION } from "~/constants/app";
import { BASE_URL } from "~/constants/endpoints";
import { TEMPORARY_PHONE_IDENTIFIER } from "~/constants/phone-identifier";

export async function getNetworkStructureV1All (): Promise<Array<Structure>> {
  const response = await fetch(`${BASE_URL}/structure/v1/all`, {
    headers: {
      correlationId: uuidv4(),
      hashId: TEMPORARY_PHONE_IDENTIFIER,
      structureId: "NOT_FOUND",
      "User-Agent": `MaBanque/${APP_ANDROID_VERSION}`
    }
  });

  const data = await response.json() as {
    structures: Array<Structure>;
  };

  return data.structures;
}
