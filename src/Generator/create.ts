// base
import BaseGenerator from "./BaseGenerator";

// constant
import DDLConstant from "../Constant/ddl";

// type
import { TableInfo } from "../Interface/table";

export default class CreateGenerator extends BaseGenerator {
  constructor() {
    super("create");
  }

  public async createTableQuery(tableName: string, tableData: TableInfo[]) {
    const arrCreateQuery: string[] = [
      DDLConstant.CREATE_TABLE_TEMPLATE.START.replace("%tableName%", tableName),
    ];
    const arrColumnQuery: string[] = [];

    tableData.forEach((row) => {
      if (row.Type === "VARCHAR") {
        row.sType = DDLConstant.VARCHAR.replace("%length%", `${row.Length}`);
      } else {
        row.sType = "";
      }

      if (row.NULL === 0) {
        row.sNULL = DDLConstant.IS_NOT_NULL;
      } else {
        row.sNULL = DDLConstant.IS_NULL;
      }

      arrColumnQuery.push(
        `${row.Field} ${row.sType ? row.sType : row.Type} ${row.sNULL}`
      );
    });

    arrCreateQuery.push(
      arrColumnQuery.join(DDLConstant.CREATE_TABLE_TEMPLATE.SEPARATOR)
    );
    arrCreateQuery.push(DDLConstant.CREATE_TABLE_TEMPLATE.END);

    return arrCreateQuery.join("");
  }
}
