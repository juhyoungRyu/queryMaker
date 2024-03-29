import BaseGenerator from "./BaseGenerator";
import { SelectInfo } from "../interface/select";

export default class SelectGenerator extends BaseGenerator {
  constructor() {
    super("SelectGenerator");
  }

  // 필수 값 확인 user 정보, query type, table명, column명
  public async selectQeury(Request: SelectInfo) {
    const body: any = Request;
    this.GenLogger.log("info", body);

    if (this._.isEmpty(body.table) || !body.table) {
      // table name
      body.response.status = 401;
      body.response.message = "table";
      return;
    }

    if (this._.isEmpty(body.column) || body.column) {
      // type
      body.response.status = 401;
      body.response.message = "column";
      return;
    }
    const columnsArray = Object.entries(body.column).map(([key, value]) => {
      return `${key} AS ${value}`;
    });
    const columnString = columnsArray.join(", ");

    // // WHERE 조건 처리
    let whereConditions = body.where
      .map(({ column, operator, value }: any) =>
        typeof value === "number"
          ? `${column} ${operator} ${value}`
          : `${column} ${operator} '${value}'`
      )
      .join(" AND ");

    if (whereConditions) {
      whereConditions = "WHERE " + whereConditions;
    } else {
      whereConditions = "";
    }

    // SORT 조건 처리
    const orderBy = body.sort
      .map(({ column, order }: any) => `${column} ${order.toUpperCase()}`)
      .join(", ");

    // 최종 SQL 쿼리 문자열 생성
    const result = `SELECT ${columnString} FROM ${
      body.table
    } ${whereConditions} ${orderBy ? "ORDER BY " + orderBy : ""}`;

    return result;
  }
}
