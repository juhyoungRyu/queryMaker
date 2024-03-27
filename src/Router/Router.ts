import Generator from "../Generator/Generator";
import Logger2 from "../util/logUtil";
import Base from "../base";
import Koa_Router from "@koa/router";
import { SelectInfo, TableInfo } from "../Interface/table";

const QueryMaker = new Generator();
const Logger = new Logger2("router");

export default class SystemRouter extends Base {
  public Router: Koa_Router;

  constructor() {
    super();
    this.Router = new Koa_Router();
  }

  public Get() {
    // Get
    this.Router.get("/", (ctx) => {
      ctx.response.body = "test";
    });
  }

  public Post() {
    // Post
    this.Router.post("/createTable", async (ctx) => {
      Logger.log("line");
      Logger.log("start", "createTable");

      // 이후 controller로 이관 후 유효성 검사 로직 추가
      const body = ctx.request?.body as
        | undefined
        | { [tableName: string]: TableInfo[] };

      //TODO: 이후 모델로 변경
      if (body === undefined) {
        ctx.response.status = 400;
        ctx.response.message = "Data Not Found";

        return;
      }

      //TODO: 이후 각 함수 밑으로 이관
      let query: string = "";

      const arrTableName = Object.keys(body);

      for (let i = 0, maxLength = arrTableName.length; i < maxLength; i++) {
        const tableName = arrTableName[i];
        query = await QueryMaker.Create.createTableQuery(
          tableName,
          body[tableName]
        );
      }

      //TODO: 이후 모델로 변경
      ctx.response.status = 200;
      ctx.response.message = query;

      Logger.log("success", query);
      Logger.log("line");
    });
    // Post
    this.Router.post("/createSelectQuery", async (ctx) => {
      //TODO: 이후 controller로 이관 후 유효성 검사 로직 추가
      // 이후 controller로 이관 후 유효성 검사 로직 추가
      const body = ctx.request?.body as | SelectInfo ;

      const result = await QueryMaker.Select.selectQeury(body);

      return result
    });
  }
}
