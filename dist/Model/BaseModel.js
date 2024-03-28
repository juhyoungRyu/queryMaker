"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
const logUtil_1 = __importDefault(require("../util/logUtil"));
class BaseModel extends base_1.default {
    constructor(name) {
        super();
        this.Logger = new logUtil_1.default(name);
        this.ModelName = name;
    }
    modelLog(...[type, message]) {
        this.Logger.log(type, message ? message : "");
    }
}
exports.default = BaseModel;
