export type FutureOperation = {
  date_heure: number
  id_compte: string
  libelle: string
  montant_en_euro: {
    devise: string
    montant: number
  }
};

export type Operation = {
  account_number: string
  cat_version: number
  fromBdd: boolean
  id_deferred: null // TODO: find type
  manual_categ: boolean
  mongoDBId: string
  note: null | string
} & OperationPreview;

export type OperationPreview = {
  amount: number
  cat_id: string
  currency: string
  date: number
  family_operation_type: number
  is_marked: boolean
  label: string
  mask_from_budget: boolean
  operation_id: string
  sub_cat_id: string
  type: "Avoir" | "Paiement par carte" | "Prélèvement"
};
