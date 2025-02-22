import { config } from "dotenv";
import { join } from "node:path";

import { getSyntheseV1Client } from "../src";

// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

void async function main () {
  const accessToken = process.env.ACCESS_TOKEN;

  if (!accessToken) {
    console.error("Please provide the ACCESS_TOKEN environment variables.");
    return;
  }

  const summary = await getSyntheseV1Client(accessToken);
  console.dir(summary, { depth: Infinity });
}();
