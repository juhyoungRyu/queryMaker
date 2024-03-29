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
// base
const BaseGenerator_1 = __importDefault(require("./BaseGenerator"));
// constant
const ddl_1 = __importDefault(require("../constant/ddl"));
class CreateGenerator extends BaseGenerator_1.default {
    constructor() {
        super("CreateGenerator");
    }
    createTableQuery(tableName, tableData) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrCreateQuery = [
                ddl_1.default.CREATE_TABLE_TEMPLATE.START.replace("%tableName%", tableName),
            ];
            const arrColumnQuery = [];
            tableData.forEach((row) => {
                if (row.Type === "VARCHAR") {
                    row.sType = ddl_1.default.VARCHAR.replace("%length%", `${row.Length}`);
                }
                else {
                    row.sType = "";
                }
                if (row.NULL === 0) {
                    row.sNULL = ddl_1.default.IS_NOT_NULL;
                }
                else {
                    row.sNULL = ddl_1.default.IS_NULL;
                }
                arrColumnQuery.push(`${row.Field} ${row.sType ? row.sType : row.Type} ${row.sNULL}`);
            });
            arrCreateQuery.push(arrColumnQuery.join(ddl_1.default.CREATE_TABLE_TEMPLATE.SEPARATOR));
            arrCreateQuery.push(ddl_1.default.CREATE_TABLE_TEMPLATE.END);
            return arrCreateQuery.join("");
        });
    }
}
exports.default = CreateGenerator;
