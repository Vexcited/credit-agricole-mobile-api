export type Structure = {
  cr_number: string;
  departments: Array<{
    code: string;
    label: string;
  }>;
  long_label: string;
  short_label: string;
  structure_id: string;
};
