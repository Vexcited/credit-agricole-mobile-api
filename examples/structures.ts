import { getNetworkStructureV1All } from "../src";

void async function main () {
  const structures = await getNetworkStructureV1All();
  console.dir(structures, { depth: Infinity });
}();
