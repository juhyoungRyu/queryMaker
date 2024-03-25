export interface tableSheet {
  Field: string;
  Type: "VARCHAR" | "CHAR" | "DATETIME"; // ... 추가 예정
  sType?: string;
  Length: string;
  Scale?: string;
  Key: string;
  NULL: "0" | "1";
  sNull: string;
  Comments: string;
}
