import type { OperationPreview } from "./operation";

export type Account = {
  balance: {
    amount: number
    currency: "EUR"
  }
  contract_number: string
  deferred_cards: never[] // TODO: find type
  is_saving: boolean
  label: string
  operations: Array<OperationPreview>
};
