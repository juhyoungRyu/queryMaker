import Base from "../base";
import Logger from "../Util/logUtil";

// constant
import DDLConstant from "../Constant/ddl";

// type
import { TableInfo } from "../Interface/table";

export default class CreateGenerator extends Base {
  private logger: Logger;

  constructor() {
    super();
    this.logger = new Logger("generater");
  }

  // 필수 값 확인 user 정보, query type, table명, column명
  public async selectQeury(event: any) {
    const body: any = event.body 

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

    // 필수로 필요한 값 : Column, tableName 

    // 항상 작성되어야하는 부분: SELECT, FROM, WHERE 1 = 1 

    // 조건으로 붙어야할 항목 : 
        // WHERE에는 AND COLUMN 조건식 조건 array index에 ''을 기준? 아님 key: value형태로 받을지 확인 
        // ORDERT BY column array index에 ''을 기준? 아님 key: value형태로 받을지 확인 
    const column: string = body.column.forEach((item: string) => {
        let result: string = '' 
        result += ',',item

        return result
    }) // test용 코드 

    if(!this._.isEmpty(body.where)){
        // condition 대해서 만들기 
            // AND COLUMN 계산 인자 CONDITION 맞추기 
    }
    if(!this._.isEmpty(body.sort)){
        // sort에 따른 oder by 맞추기 
            // COLUMN sortType 
    }
    const result = ` SELECT ${column} FROM ${body.table} WHERE 1 = 1`

    return result
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
