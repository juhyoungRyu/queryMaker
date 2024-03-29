"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
class Logger extends base_1.default {
    constructor(caller) {
        super();
        this.TYPE = {
            error: "ERROR",
            info: "INFO",
            success: "SUCCESS",
            start: "START",
            fail: "FAIL",
            line: "",
        };
        this.template = `%timestamp% [${caller}][%type%] %message%`;
    }
    getTime() {
        return this.Moment().format("YYYY/MM/DD HH:mm:ss");
    }
    log(type, message) {
        let msg = this._.cloneDeep(this.template);
        msg = msg
            .replace(/%type%/gm, this.TYPE[type])
            .replace(/%timestamp%/gm, this.getTime())
            .replace(/%message%/gm, message);
        if (type === "line") {
            console.error("---------------------------------------------------");
        }
        else if (type === "error") {
            console.error(msg);
        }
        else if (type === "fail") {
            console.warn(msg);
        }
        else {
            console.log(msg);
        }
    }
}
exports.default = Logger;
