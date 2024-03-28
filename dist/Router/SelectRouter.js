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
        const result = yield QueryMaker.selectQeury(ctx.request);
        return result;
    }));
    return selectRouter;
}
exports.SelectRouter = SelectRouter;
