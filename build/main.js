"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Koa
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
// QueryMaker
const create_1 = __importDefault(require("./Generator/create"));
// util
const logUtil_1 = __importDefault(require("./Util/logUtil"));
// init
const QueryMaker = new create_1.default();
const Logger = new logUtil_1.default("main");
const Server = new koa_1.default();
const Router = new router_1.default();
// Post
Router.post("/createTable", (ctx) => {
    var _a;
    Logger.log("line");
    Logger.log("start", "createTable");
    const body = (_a = ctx.request) === null || _a === void 0 ? void 0 : _a.body;
    if (body === undefined) {
        ctx.response.status = 400;
        ctx.response.message = "Data Not Found";
        return;
    }
    const arrTableName = Object.keys(body);
    arrTableName.forEach((tableName) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(yield QueryMaker.createTableQuery(tableName, body[tableName]));
    }));
    Logger.log("line");
});
// Server Module
Server.use((0, cors_1.default)());
Server.use((0, koa_bodyparser_1.default)());
Server.use(Router.routes()).use(Router.allowedMethods());
// Server Start
Server.listen(3000, () => Logger.log("info", "🚀 Server Start 🚀"));
