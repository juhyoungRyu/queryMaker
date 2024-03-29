"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Koa
const koa_1 = __importDefault(require("koa"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
// Router
const BaseRouter_1 = __importDefault(require("./Router/BaseRouter"));
const SelectRouter_1 = require("./Router/SelectRouter");
const TableRouter_1 = require("./Router/TableRouter");
// Util
const logUtil_1 = __importDefault(require("./util/logUtil"));
// init
const Server = new koa_1.default();
const Router = new BaseRouter_1.default();
const Logger = new logUtil_1.default("main");
Router.API.use("/select", (0, SelectRouter_1.SelectRouter)().API.routes());
Router.API.use("/table", (0, TableRouter_1.TableRouter)().API.routes());
// Server Module
Server.use((0, cors_1.default)());
Server.use((0, koa_bodyparser_1.default)());
Server.use(Router.API.routes()).use(Router.API.allowedMethods());
// Server Start
Server.listen(3001, () => Logger.log("info", "🚀 Server Start 🚀"));
