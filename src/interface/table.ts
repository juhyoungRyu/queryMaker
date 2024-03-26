export interface TableInfo {
  Field: string;
  Type: "VARCHAR" | "CHAR" | "DATETIME" | "INT";
  sType?: string;
  Length: number | "N/A";
  Scale?: string;
  Key?: "PK" | "FK";
  NULL: 0 | 1;
  sNULL?: string;
  Comments: string;
}