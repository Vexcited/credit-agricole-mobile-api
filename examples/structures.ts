import { getStructureV1All } from "../src";

void async function main () {
  const structures = await getStructureV1All();
  console.dir(structures, { depth: Infinity });
}();
