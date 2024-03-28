"use strict";
//TODO: middleware 붙여서 후에 처리...
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class ExceptionModel extends BaseModel_1.default {
    constructor(exceptionName) {
        super(exceptionName);
    }
    DataNotFound(statusCode, message) { }
}
exports.default = ExceptionModel;
