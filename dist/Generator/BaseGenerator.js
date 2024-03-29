"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
const logUtil_1 = __importDefault(require("../util/logUtil"));
class CreateGenerator extends base_1.default {
    constructor(GenertorName) {
        super();
        this.Request = {};
        this.Response = {};
        this.GenLogger = new logUtil_1.default(GenertorName);
    }
}
exports.default = CreateGenerator;
