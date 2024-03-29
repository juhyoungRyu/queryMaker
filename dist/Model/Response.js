"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class ResponsetModel extends BaseModel_1.default {
    constructor(response, code) {
        super("ResponsetModel");
        this.response = response;
        this.statusCode = code ? code : 200;
    }
    createTable(query) {
        this.response.body = {
            success: this.statusCode === 200 ? true : false,
            query,
        };
        return this.response;
    }
}
exports.default = ResponsetModel;
