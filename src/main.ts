// Koa
import Koa from "koa";
import Koa_CORS from "@koa/cors";
import Koa_BodyParser from "koa-bodyparser";

// Router
import Router from "./Router/BaseRouter";
import { SelectRouter } from "./Router/SelectRouter";
import { TableRouter } from "./Router/TableRouter";

// Util
import LogUtil from "./util/logUtil";

// init
const Server = new Koa();
const SystemRouter = new Router().API;
const Logger = new LogUtil("main");

SystemRouter.use("/select", SelectRouter().API.routes());
SystemRouter.use("/table", TableRouter().API.routes());

// Server Module
Server.use(
  Koa_CORS({
    origin: "*",
  })
);
Server.use(Koa_BodyParser());
Server.use(SystemRouter.routes()).use(SystemRouter.allowedMethods());

// Server Start
Server.listen(3001, () => Logger.log("info", "🚀 Server Start 🚀"));
