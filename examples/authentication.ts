import { config } from "dotenv";
import { join } from "node:path";

import {
  EnrollmentMissingError,
  getAuthenticationV1Keypad,
  getScadV1Enrollments,
  postAuthenticationV1FinalizeCoSp,
  postAuthenticationV1Keypad,
  postAuthenticationV1ScadRetainDeviceFirstCo,
  type Tokens
} from "../src";

// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

// Helper function to wait for a given amount of time.
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

void async function main () {
  const login = process.env.LOGIN;
  const password = process.env.PASSWORD;
  const structure = process.env.STRUCTURE;

  if (!login || !password || !structure) {
    console.error("Please provide the LOGIN, PASSWORD and STRUCTURE environment variables.");
    return;
  }

  const keypad = await getAuthenticationV1Keypad(structure);
  const keys = password.split("").map((char) => keypad.keys_layout.indexOf(char).toString());
  const tokens = await postAuthenticationV1Keypad(structure, login, keypad.id, keys)
    .catch(async (error) => {
      if (error instanceof EnrollmentMissingError) {
        const enrollment = await getScadV1Enrollments(structure, error.details.auth_session_id, error.details.pivot_id);
        if (enrollment.status === "ENROLLED_ANOTHER_DEVICE") {
          console.log("Enrollment is already active on another device:", enrollment.friendly_name);
          console.log("We'll retain it active on that device, you'll need to verify the authentication from it.");
          await postAuthenticationV1ScadRetainDeviceFirstCo(structure, error.details.pivot_id, error.details.auth_session_id, login);

          let tokens: null | Tokens = null;

          while (!tokens) {
            console.log("Polling for verification...");
            tokens = await postAuthenticationV1FinalizeCoSp(structure, error.details.pivot_id, error.details.auth_session_id);
            // Let's poll every 5 seconds...
            await wait(5000);
          }

          return tokens;
        }
        // TODO: not supported states...
        else throw error;
      }

      // There is nothing we can do...
      throw error;
    });

  console.log("---\nCongratulations! You're authenticated.");
  console.log(tokens);
}();
