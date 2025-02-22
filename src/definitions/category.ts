export type Category = {
  active: boolean
  color_hex: string
  custom: boolean
  dark_color_hex: string
  /**
   * Name of the assets within the app.
   * @example "ic_mobile_medium"
   */
  icon_name: string
  id: string
  label: string
  mongoDBId: string
  name_key: string
  parent_id?: string
  type_value: "depense" | "revenu"
};
