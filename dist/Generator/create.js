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
// util
const StringUtil_1 = __importDefault(require("../util/StringUtil"));
// constant
const ddl_1 = __importDefault(require("../constant/ddl"));
class CreateGenerator extends BaseGenerator_1.default {
    constructor() {
        super("CreateGenerator");
        this.StringUtil = new StringUtil_1.default();
    }
    /**
     * createTableQuery
     * @param tableName 대상 테이블명
     * @param tableData 대상 테이블 정보
     * @returns 테이블 생성 쿼리 (CREATE TABLE ...)
     */
    createTableQuery(tableName, tableData) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrColumnQuery = [];
            tableData.forEach((row) => {
                // 1. type 치환
                if (row.Type === "VARCHAR") {
                    row.sType = ddl_1.default.VARCHAR_TEMPLATE.replace("%length%", `${row.Length}`);
                }
                else {
                    row.sType = "";
                }
                // 2. Null 여부 치환
                if (row.NULL === 0) {
                    row.sNULL = ddl_1.default.IS_NOT_NULL;
                }
                else {
                    row.sNULL = ddl_1.default.IS_NULL;
                }
                // 치환 완료 쿼리 저장
                arrColumnQuery.push(`${row.Field} ${row.sType ? row.sType : row.Type} ${row.sNULL}`);
            });
            const tableCreateQuery = this.StringUtil.Concat(ddl_1.default.CREATE_TABLE_TEMPLATE.START.replace("%tableName%", tableName), arrColumnQuery.join(ddl_1.default.CREATE_TABLE_TEMPLATE.SEPARATOR), ddl_1.default.CREATE_TABLE_TEMPLATE.END);
            return tableCreateQuery;
        });
    }
}
exports.default = CreateGenerator;
