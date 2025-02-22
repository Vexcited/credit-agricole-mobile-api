import { v4 as uuidv4 } from "uuid";

import { APP_ANDROID_VERSION } from "~/constants/app";
import { PHONE_IDENTIFIER } from "~/constants/phone-identifier";

// TODO: find out what happens when not enrolled, or other states.
export type Enrollment = {
  app_instance_id: string
  enrolled: true
  friendly_name: string
  status: "ENROLLED_ANOTHER_DEVICE"
};

export async function getScadV1Enrollments (structureId: string, authSessionId: string, pivotId: string): Promise<Enrollment> {
  const response = await fetch(`https://nmb.credit-agricole.fr/scad/v1/enrollments/${pivotId}?force_update=true`, {
    headers: {
      authSessionId,
      correlationId: uuidv4(),
      hashId: PHONE_IDENTIFIER,
      structureId,
      "User-Agent": `MaBanque/${APP_ANDROID_VERSION}`
    }
  });

  return response.json();
}
