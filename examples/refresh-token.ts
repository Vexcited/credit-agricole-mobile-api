import { config } from "dotenv";
import { join } from "node:path";

import { postAuthenticationV1RefreshToken } from "../src";

// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

void async function main () {
  const accessToken = process.env.ACCESS_TOKEN;
  const refreshToken = process.env.REFRESH_TOKEN;

  if (!accessToken || !refreshToken) {
    console.error("Please provide ACCESS_TOKEN and REFRESH_TOKEN environment variables.");
    return;
  }

  const tokens = await postAuthenticationV1RefreshToken(accessToken, refreshToken);
  console.log("---\nCongratulations! You're authenticated, once again.");
  console.log(tokens);
}();
