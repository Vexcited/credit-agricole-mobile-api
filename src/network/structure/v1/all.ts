import { v4 as uuidv4 } from "uuid";

import type { Structure } from "~/definitions";

import { APP_ANDROID_VERSION } from "~/constants/app";
import { PHONE_IDENTIFIER } from "~/constants/phone-identifier";

export async function getNetworkStructureV1All (): Promise<Array<Structure>> {
  const response = await fetch("https://nmb.credit-agricole.fr/structure/v1/all", {
    headers: {
      correlationId: uuidv4(),
      hashId: PHONE_IDENTIFIER,
      structureId: "NOT_FOUND",
      "User-Agent": `MaBanque/${APP_ANDROID_VERSION}`
    }
  });

  const data = await response.json() as {
    structures: Array<Structure>;
  };

  return data.structures;
}
