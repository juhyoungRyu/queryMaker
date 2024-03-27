// Koa
import Koa from "koa";
import Koa_CORS from "@koa/cors";
import Koa_BodyParser from "koa-bodyparser";
import SystemRouter from "./Router/Router";
// util
import LogUtil from "./util/logUtil";

// init
const Logger = new LogUtil("main");
const Server = new Koa();
const Router = new SystemRouter();

// Server Module
Server.use(Koa_CORS());
Server.use(Koa_BodyParser());
Server.use(Router.Router.routes()).use(Router.Router.allowedMethods());

// Server Start
Server.listen(3001, () => Logger.log("info", "🚀 Server Start 🚀"));
