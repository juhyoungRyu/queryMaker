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
    // select query에 필요한 값에 대해서 확인
    // 쿼리 생성 확인
    // gpt 검증 확인 (유료)
    // example => 생성 후 return시, 파일 생성 후 전달 화면에 뿌려주기
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
