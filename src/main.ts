// Koa
import Koa from "koa";
import Koa_CORS from "@koa/cors";
import Koa_BodyParser from "koa-bodyparser";
import SystemRouter from "./Router/Router";

// Util
import LogUtil from "./Util/LogUtil";

// init
const Server = new Koa();
const Router = new SystemRouter();
const Logger = new LogUtil("main");

// Server Module
Server.use(Koa_CORS());
Server.use(Koa_BodyParser());
Server.use(Router.API.routes()).use(Router.API.allowedMethods());

// Server Start
Server.listen(3001, () => Logger.log("info", "🚀 Server Start 🚀"));
