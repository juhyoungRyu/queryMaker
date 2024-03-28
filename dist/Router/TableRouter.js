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
exports.TableRouter = void 0;
const Response_1 = __importDefault(require("../Model/Response"));
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const Core_1 = __importDefault(require("../Generator/Core"));
const QueryMaker = new Core_1.default().Create;
/**
 * TableRouter
 * @path /table
 * @example
 * Router.API.use('/createTable', TableRouter())
 */
function TableRouter() {
    const tableRouter = new BaseRouter_1.default();
    tableRouter.API.post("/createQuery", (ctx) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        tableRouter.Logger.log("start", "createQuery");
        const query = yield createQuery((_a = ctx.request) === null || _a === void 0 ? void 0 : _a.body);
        ctx.response = new Response_1.default(ctx.response).createTable(query);
        tableRouter.Logger.log("success", "createQuery");
        return;
    }));
    return tableRouter;
}
exports.TableRouter = TableRouter;
function createQuery(body) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "";
        const arrTableName = Object.keys(body);
        for (let i = 0, maxLength = arrTableName.length; i < maxLength; i++) {
            const tableName = arrTableName[i];
            query += yield QueryMaker.createTableQuery(tableName, body[tableName]);
        }
        return query;
    });
}
