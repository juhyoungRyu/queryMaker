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

// Post
Router.post("/createTable", (ctx) => {
  Logger.log("line");
  Logger.log("start", "createTable");

  const body = ctx.request?.body as
    | undefined
    | { [tableName: string]: TableInfo[] };

  if (body === undefined) {
    ctx.response.status = 400;
    ctx.response.message = "Data Not Found";

    return;
  }

  const arrTableName = Object.keys(body);

  arrTableName.forEach(async (tableName) => {
    console.log(await QueryMaker.createTableQuery(tableName, body[tableName]));
  });

  Logger.log("line");
});

// Server Module
Server.use(Koa_CORS());
Server.use(Koa_BodyParser());
Server.use(Router.routes()).use(Router.allowedMethods());

// Server Start
Server.listen(3000, () => Logger.log("info", "🚀 Server Start 🚀"));
