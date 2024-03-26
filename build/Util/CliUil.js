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
const base_1 = __importDefault(require("../base"));
const prompts_1 = require("prompts");
const LogUtil_1 = __importDefault(require("./LogUtil"));
class CLI extends base_1.default {
    constructor() {
        super();
        this.logger = new LogUtil_1.default("CliUtil");
    }
    question(type, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {};
            try {
                const { question } = yield (0, prompts_1.prompt)({
                    type,
                    name: "question",
                    message,
                });
                this.logger.log("success", `Answer : ${question}`);
                result = { success: true, path: question };
            }
            catch (error) {
                result.success = false;
                this.logger.log("error", error.message);
            }
            return result;
        });
    }
}
exports.default = CLI;
