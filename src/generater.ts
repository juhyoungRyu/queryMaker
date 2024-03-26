import Base from "./base";
import Logger from "../src/util/LogUtil";

// constant
import DDLConstant from "./constant/ddl";

// type
import { TableInfo } from "./interface/table";

export default class Generater extends Base {
  private logger: Logger;

  constructor() {
    super();
    this.logger = new Logger("generater");
  }

  // 필수 값 확인 user 정보, query type, table명, column명
  public async selectQeury(event: any) {
    const body = event.body 

    if(this._.isEmpty(body.table) || body.hasOwnProperty(body,'table')){ // table name 
        body.response.status = 401;
        body.response.message = "table";
        return;
    }

    if(this._.isEmpty(body.column)|| body.hasOwnProperty(body,'column')){ // type 
        body.response.status = 401;
        body.response.message = "column";
        return;
    }
    // SELECT, COLUMN, FROM tableName WHERE ORDER BY 

    // 항상 작성되어야하는 부분: SELECT, FROM, WHERE 1 = 1 

    // 조건으로 붙어야할 항목 : WHERE에는 AND COLUMN 조건식 조건
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

      arrColumnQuery.push(`${row.Field} ${row.sType ? row.sType : row.Type} ${row.sNULL}`);
    });

    arrCreateQuery.push(arrColumnQuery.join(DDLConstant.CREATE_TABLE_TEMPLATE.SEPARATOR));
    arrCreateQuery.push(DDLConstant.CREATE_TABLE_TEMPLATE.END);

    return arrCreateQuery.join("");
  }
}
