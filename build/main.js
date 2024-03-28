"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Koa
const koa_1 = __importDefault(require("koa"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const Router_1 = __importDefault(require("./Router/Router"));
// Util
const LogUtil_1 = __importDefault(require("./Util/LogUtil"));
// init
const Server = new koa_1.default();
const Router = new Router_1.default();
const Logger = new LogUtil_1.default("main");
// Server Module
Server.use((0, cors_1.default)());
Server.use((0, koa_bodyparser_1.default)());
Server.use(Router.API.routes()).use(Router.API.allowedMethods());
// Server Start
Server.listen(3001, () => Logger.log("info", "🚀 Server Start 🚀"));
