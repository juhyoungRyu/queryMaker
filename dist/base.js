"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
class Base {
    constructor() {
        this._ = lodash_1.default;
        this.Moment = moment_1.default;
    }
}
exports.default = Base;
