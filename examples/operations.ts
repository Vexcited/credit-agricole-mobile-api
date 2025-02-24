import { config } from "dotenv";
import { join } from "node:path";

import { getFutureOperationV1FutureCardOperations, getFutureOperationV1FutureTransfers, getHomeV2FirstAccount, getOperationV2Operations } from "../src";

// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

void async function main () {
  const accessToken = process.env.ACCESS_TOKEN;

  if (!accessToken) {
    console.error("Please provide the ACCESS_TOKEN environment variables.");
    return;
  }

  const account = await getHomeV2FirstAccount(accessToken);
  const { operations } = await getOperationV2Operations(accessToken, account.contract_number);
  const { operations: futureOperations, preauthorized_operations: futurePreAuthOperations } = await getFutureOperationV1FutureCardOperations(accessToken, account.contract_number);
  const { future_transfers: futureTransfers, total_amount: futureTransfersTotalAmount } = await getFutureOperationV1FutureTransfers(accessToken, account.contract_number);

  const allFutureOperations = [...futureOperations, ...futurePreAuthOperations];
  allFutureOperations.sort((a, b) => b.date_heure - a.date_heure);

  const currentBalance = account.balance.amount;
  const futureBalance = allFutureOperations.reduce((acc, operation) => acc + operation.montant_en_euro.montant, currentBalance) + futureTransfersTotalAmount;

  console.log(`Currently at ${currentBalance.toFixed(2)}, but will be at ${futureBalance.toFixed(2)} after all future operations and transfers.`);

  console.log("\nFUTURE TRANSFERS\n-----------------");
  for (const transfer of futureTransfers) {
    console.log(transfer.amount.toFixed(2), "EUR", "@", transfer.creditor_name);
  }

  console.log("\nFUTURE OPERATIONS\n-----------------");
  for (const operation of allFutureOperations) {
    console.log(operation.montant_en_euro.montant.toFixed(2), operation.montant_en_euro.devise, "@", operation.libelle);
  }

  console.log("\nLAST OPERATIONS DONE\n--------------------");
  for (const operation of operations) {
    console.log(operation.amount.toFixed(2), operation.currency, "@", operation.label);
  }
}();
