import BaseGenerator from "./BaseGenerator";
import { SelectInfo, WhereInfo } from "../interface/select";

export default class SelectGenerator extends BaseGenerator {
  constructor() {
    super("SelectGenerator");
  }

  // 필수 값 확인 user 정보, query type, table명, column명
  public async selectQeury(Request: SelectInfo) {
    const body: any = Request;
    this.GenLogger.log("info", JSON.stringify(Request))

    const columnsArray = Object.entries(body.column).map(([key, value]) => {
      return `${key} AS ${value}`;
    });
    const columnString = columnsArray.join(", ");
    let result: string = `SELECT ${columnString} FROM ${ body.table } `

    // WHERE 절 처리
    let whereConditions = "";

    if (Request.where && Request.where.length) {
      for (let i = 0; i < Request.where.length; i++) {
          const { column, operator, condition }: any = Request.where[i];
          if (condition !== undefined) { // condition가 undefined가 아닌 경우에만 처리
              const formattedValue = typeof condition === "number" ? condition : `'${condition}'`;
              whereConditions += (whereConditions ? " AND " : "") + `${column} ${operator} ${formattedValue}`;
          }
      }
    }

    if (whereConditions) {
        result += ` WHERE ${whereConditions}`;
    }

    // SORT 절 처리
    if (Request.sort && Request.sort.length) {
      const orderByConditions = Request.sort.reduce((acc, { column, operator = "ASC" }: any, index) => {
          const prefix = index > 0 ? ", " : ""; // 첫 번째 조건이 아닌 경우 "," 추가
          return `${acc}${prefix}${column} ${operator}`;
      }, "");
      result += ` ORDER BY ${orderByConditions}`;
    }
    // 최종 SQL 쿼리 문자열 생성
    this.GenLogger.log("info", JSON.stringify(result))
    return result;
  }
}
