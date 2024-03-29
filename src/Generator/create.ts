// base
import BaseGenerator from "./BaseGenerator";

// util
import StringUtil from "../util/StringUtil";

// constant
import DDLConstant from "../constant/ddl";

// type
import { TableInfo } from "../interface/table";

export default class CreateGenerator extends BaseGenerator {
  private StringUtil: StringUtil;

  constructor() {
    super("CreateGenerator");
    this.StringUtil = new StringUtil();
  }

  /**
   * createTableQuery
   * @param tableName 대상 테이블명
   * @param tableData 대상 테이블 정보
   * @returns 테이블 생성 쿼리 (CREATE TABLE ...)
   */
  public async createTableQuery(tableName: string, tableData: TableInfo[]) {
    const arrColumnQuery: string[] = [];

    tableData.forEach((row) => {
      // 1. type 치환
      if (row.Type === "VARCHAR") {
        row.sType = DDLConstant.VARCHAR_TEMPLATE.replace(
          "%length%",
          `${row.Length}`
        );
      } else {
        row.sType = "";
      }

      // 2. Null 여부 치환
      if (row.NULL === 0) {
        row.sNULL = DDLConstant.IS_NOT_NULL;
      } else {
        row.sNULL = DDLConstant.IS_NULL;
      }

      // 치환 완료 쿼리 저장
      arrColumnQuery.push(
        `${row.Field} ${row.sType ? row.sType : row.Type} ${row.sNULL}`
      );
    });

    const tableCreateQuery = this.StringUtil.Concat(
      DDLConstant.CREATE_TABLE_TEMPLATE.START.replace("%tableName%", tableName),
      arrColumnQuery.join(DDLConstant.CREATE_TABLE_TEMPLATE.SEPARATOR),
      DDLConstant.CREATE_TABLE_TEMPLATE.END
    );

    return tableCreateQuery;
  }
}
