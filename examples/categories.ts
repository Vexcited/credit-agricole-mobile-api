import { config } from "dotenv";
import { join } from "node:path";

import { getCategorisationV1FullCategories } from "../src";

// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

void async function main () {
  const structure = process.env.STRUCTURE;
  const accessToken = process.env.ACCESS_TOKEN;

  if (!structure || !accessToken) {
    console.error("Please provide the STRUCTURE and ACCESS_TOKEN environment variables.");
    return;
  }

  const categories = await getCategorisationV1FullCategories(accessToken, structure);
  console.dir(categories, { depth: Infinity });
}();
