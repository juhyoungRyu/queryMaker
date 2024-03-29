"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
const logUtil_1 = __importDefault(require("./logUtil"));
class StringUtil extends base_1.default {
    constructor() {
        super();
        this.Logger = new logUtil_1.default("StringUtil");
    }
    Concat(...sReq) {
        if (sReq.length === 0) {
            this.Logger.log("error", "Request String is Empty");
            return "";
        }
        let attachString = sReq[0];
        for (let i = 1, maxLength = sReq.length; i < maxLength; i++) {
            attachString += sReq[i];
        }
        this.Logger.log("success", "concatenation");
        return attachString;
    }
}
exports.default = StringUtil;
