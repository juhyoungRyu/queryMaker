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
    // column 객체에서 SQL 컬럼 문자열 생성
    const columnsArray = Object.entries(body.column).map(([key, value]) => {
        return `${key} AS ${value}`;
    });
    const columnString = columnsArray.join(', ');

    // WHERE 조건 처리
    let whereConditions = body.where.map(({ column, operator, value }: any) => 
        typeof value === 'number' ? `${column} ${operator} ${value}` : `${column} ${operator} '${value}'`
    ).join(' AND ');

    if(whereConditions) {
        whereConditions = "WHERE " + whereConditions;
    } else {
        whereConditions = "";
    }

    // SORT 조건 처리
    const orderBy = body.sort.map(({ column, order }: any) => `${column} ${order.toUpperCase()}`).join(', ');

    // 최종 SQL 쿼리 문자열 생성
    const result = `SELECT ${columnString} FROM ${body.table} ${whereConditions} ${orderBy ? 'ORDER BY ' + orderBy : ''}`;

    return result
  }
}
