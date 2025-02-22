import { v4 as uuidv4 } from "uuid";

import type { Keypad, Tokens } from "~/definitions";

import { APP_ANDROID_VERSION } from "~/constants/app";
import { PHONE_IDENTIFIER } from "~/constants/phone-identifier";

export type EnrollmentErrorDetails = {
  auth_session_id: string
  authentication_level: string
  cael_id: string
  phone_number: string
  pivot_id: string
};

export class EnrollmentMissingError extends Error {
  constructor (public details: EnrollmentErrorDetails) {
    super("Enrollment is missing, please enroll your device.");
    this.name = "EnrollmentMissingError";
  }
}

export class KeypadExpiredError extends Error {
  constructor () {
    super("Keypad has expired, please request a new one.");
    this.name = "KeypadExpiredError";
  }
}

/**
 * Retrieve the keypad layout for authentication.
 */
export async function getAuthenticationV1Keypad (structureId: string): Promise<Keypad> {
  const response = await fetch("https://nmb.credit-agricole.fr/authentication/v1/keypad", {
    headers: {
      correlationId: uuidv4(),
      hashId: PHONE_IDENTIFIER,
      structureId,
      "User-Agent": `MaBanque/${APP_ANDROID_VERSION}`
    }
  });

  return response.json();
}

/**
 * Authenticate using the keypad.
 *
 * @param login Your account number.
 * @param id ID of the keypad retrieved.
 * @param passwordKeys Index of the keys pressed on the keypad.
 */
export async function postAuthenticationV1Keypad (structureId: string, login: string, id: string, passwordKeys: string[]): Promise<Tokens> {
  const response = await fetch(`https://nmb.credit-agricole.fr/authentication/v1/keypad/${structureId}`, {
    body: JSON.stringify({
      id,
      login,
      password_keys: passwordKeys
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

  const json = await response.json();

  if (!response.ok && "code" in json) {
    switch (json.code) {
      case "keypad_expired": throw new KeypadExpiredError();
      case "enrollment_missing": throw new EnrollmentMissingError(json.error_details);
      // TODO: make a generic error for the API
      default: throw new Error(json.message);
    }
  }

  return json;
}
