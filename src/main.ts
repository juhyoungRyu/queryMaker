// Koa
import Koa from "koa";
import Koa_Router from "@koa/router";
import Koa_CORS from "@koa/cors";
import Koa_BodyParser from "koa-bodyparser";

// QueryMaker
import Generator from "./Generator/Generator";

// util
import LogUtil from "./Util/logUtil";
import { TableInfo } from "./Interface/table";

// init
const QueryMaker = new Generator();
const Logger = new LogUtil("main");
const Server = new Koa();
const Router = new Koa_Router();

// Get
Router.get("/", (ctx) => {
  ctx.response.body = "test";
});

// Post
Router.post("/createTable", async (ctx) => {
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
Router.post("/createSelectQuery", async (ctx) => {
  //TODO: 이후 controller로 이관 후 유효성 검사 로직 추가

  const result = await QueryMaker.Select.selectQeury(ctx.request);
});
// Server Module
Server.use(Koa_CORS());
Server.use(Koa_BodyParser());
Server.use(Router.routes()).use(Router.allowedMethods());

// Server Start
Server.listen(3001, () => Logger.log("info", "🚀 Server Start 🚀"));
