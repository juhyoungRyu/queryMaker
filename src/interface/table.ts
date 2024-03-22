export interface TableInfo {
  Field: string;
  Type: "VARCHAR" | "CHAR" | "DATETIME" | "INT";
  Length: number | "N/A";
  Scale: string;
  Key: "PK" | "FK";
  NULL: "0" | "1";
  Comments: string;
}
