import Base from "../base";
import Koa_Router from "@koa/router";
import Logger from "../util/logUtil";

import Generator from "../Generator/Generator";
import GeneratorService from "../Service/GeneratorService";

import type { TableInfo } from "../interface/table";

const QueryMaker = new Generator();

export default class Router extends Base {
  public API: Koa_Router;
  public Logger: Logger;

  constructor() {
    super();
    this.API = new Koa_Router();
    this.Logger = new Logger("SystemRouter");
  }
}

/**
 * SelectRouter
 * @path /select
 * @example
 * Router.API.use('/select', SelectRouter())
 */
export function SelectRouter() {
  const selectRouter = new Router();

  selectRouter.API.post("/createQuery", async (ctx) => {
    const result = await QueryMaker.Select.selectQeury(ctx.request);
  });

  return selectRouter;
}

/**
 * TableRouter
 * @path /table
 * @example
 * Router.API.use('/createTable', TableRouter())
 */
export function TableRouter() {
  const tableRouter = new Router();

  tableRouter.API.post("/createQuery", async (ctx) => {
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

    let query: string = "";
    const arrTableName = Object.keys(body);

    for (let i = 0, maxLength = arrTableName.length; i < maxLength; i++) {
      const tableName = arrTableName[i];
      query = await QueryMaker.Create.createTableQuery(
        tableName,
        body[tableName]
      );
    }

    tableRouter.Logger.log("success", "createQuery");

    //TODO: 이후 모델로 변경
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      query,
    };
  });

  return tableRouter;
}
