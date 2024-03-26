// Koa
import Koa from "koa";
import Koa_Router from "@koa/router";
import Koa_CORS from "@koa/cors";
import Koa_BodyParser from "koa-bodyparser";

// QueryMaker
import Generater from "./Generator/create";

// util
import LogUtil from "./Util/logUtil";
import { TableInfo } from "./Interface/table";

// init
const QueryMaker = new Generater();
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
  Logger.log("info", `body : ${JSON.stringify(ctx.request.body)}`);

  const body = ctx.request?.body as
    | undefined
    | { [tableName: string]: TableInfo[] };

  if (body === undefined) {
    ctx.response.status = 400;
    ctx.response.message = "Data Not Found";

    return;
  }

  let query: string = "";

  const arrTableName = Object.keys(body);

  for (let i = 0, maxLength = arrTableName.length; i < maxLength; i++) {
    const tableName = arrTableName[i];
    query = await QueryMaker.createTableQuery(tableName, body[tableName]);
  }

  ctx.response.status = 200;
  ctx.response.message = query;

  Logger.log("success", query);
  Logger.log("line");
});
// Post
Router.post("/createSelectQuery", (ctx) => {
  // response, error model 
  const body = ctx.request?.body as undefined | { [tableName: string]: TableInfo[] };

  if (body === undefined) {
    ctx.response.status = 400;
    ctx.response.message = "Data Not Found";

    return;
  }
  
  const result = QueryMaker.selectQeury(ctx)
});
// Server Module
Server.use(Koa_CORS());
Server.use(Koa_BodyParser());
Server.use(Router.routes()).use(Router.allowedMethods());

// Server Start
Server.listen(3001, () => Logger.log("info", "🚀 Server Start 🚀"));
