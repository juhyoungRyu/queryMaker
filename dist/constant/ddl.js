"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
class DDLConstant extends base_1.default {
    constructor() {
        super();
    }
}
DDLConstant.CREATE_TABLE_TEMPLATE = {
    START: "CREATE TABLE %tableName% (",
    END: ");",
    SEPARATOR: ", ",
};
DDLConstant.VARCHAR = "VARCHAR(%length%)";
DDLConstant.IS_NULL = "DEFAULT NULL";
DDLConstant.IS_NOT_NULL = "NOT NULL";
exports.default = DDLConstant;
