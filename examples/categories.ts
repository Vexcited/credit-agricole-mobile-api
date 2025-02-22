import { config } from "dotenv";
import { join } from "node:path";

import { getCategorisationV1FullCategories } from "../src";

// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

void async function main () {
  const accessToken = process.env.ACCESS_TOKEN;

  if (!accessToken) {
    console.error("Please provide the ACCESS_TOKEN environment variables.");
    return;
  }

  // Retrieve all the categories as a flat list.
  const categories = await getCategorisationV1FullCategories(accessToken);

  // Let's display the categories in a tree-like structure.
  // We'll start by displaying the top-level categories.
  for (const category of categories.filter((category) => !category.parent_id)) {
    console.log(`\n${category.id} - ${category.label}`);

    // Then, we'll display the subcategories of each top-level category.
    for (const subcategory of categories.filter((subcategory) => subcategory.parent_id === category.id)) {
      console.log(`  ${subcategory.id} - ${subcategory.label}`);
    }
  }
}();
