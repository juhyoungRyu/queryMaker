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
exports.SelectRouter = void 0;
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const Response_1 = __importDefault(require("../Model/Response"));
const Core_1 = __importDefault(require("../Generator/Core"));
/**
 * SelectRouter
 * @path /select
 * @example
 * Router.API.use('/select', SelectRouter())
 */
function SelectRouter() {
    const selectRouter = new BaseRouter_1.default();
    const QueryMaker = new Core_1.default().Select;
    selectRouter.API.post("/createQuery", (ctx) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        selectRouter.Logger.log("start", "Select Query Create");
        selectRouter.Logger.log("start", JSON.stringify((_a = ctx.request) === null || _a === void 0 ? void 0 : _a.body));
        const result = yield QueryMaker.selectQeury(ctx.request.body);
        selectRouter.Logger.log("start", `Select Query Create ===> :: ${result}`);
        ctx.response = new Response_1.default(ctx.response).createSelect(result);
        return result;
    }));
    return selectRouter;
}
exports.SelectRouter = SelectRouter;
