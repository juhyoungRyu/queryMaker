"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
const create_1 = __importDefault(require("./create"));
const select_1 = __importDefault(require("./select"));
class CoreGenerator extends base_1.default {
    constructor() {
        super();
    }
    get Create() {
        return new create_1.default();
    }
    get Select() {
        return new select_1.default();
    }
}
exports.default = CoreGenerator;
