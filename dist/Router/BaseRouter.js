"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
// Koa
const router_1 = __importDefault(require("@koa/router"));
// Util
const logUtil_1 = __importDefault(require("../util/logUtil"));
class Router extends base_1.default {
    constructor() {
        super();
        this.API = new router_1.default();
        this.Logger = new logUtil_1.default("SystemRouter");
        this.API.get("/", (ctx) => {
            ctx.response.body = "Query Maker Server";
        });
    }
}
exports.default = Router;
