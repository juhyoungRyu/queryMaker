import Base from "../base";
import Koa_Router from "@koa/router";
import Logger from "../Util/LogUtil";

import Generator from "../Generator/Generator";
import type { TableInfo } from "../Interface/Table";

const QueryMaker = new Generator();

export default class SystemRouter extends Base {
  public API: Koa_Router;
  public Logger: Logger;

  constructor() {
    super();
    this.API = new Koa_Router();
    this.Logger = new Logger("SystemRouter");
  }
  public Get() {
    // Get
    this.API.get("/", (ctx) => {
      ctx.response.body = "test";
    });
  }

  public Post() {
    // Post
    this.API.post("/createTable", async (ctx) => {
      this.Logger.log("line");
      this.Logger.log("start", "createTable");

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

      this.Logger.log("success", query);
      this.Logger.log("line");
    });
    // Post
    this.API.post("/createSelectQuery", async (ctx) => {
      //TODO: 이후 controller로 이관 후 유효성 검사 로직 추가

      const result = await QueryMaker.Select.selectQeury(ctx.request);
    });
  }
}
