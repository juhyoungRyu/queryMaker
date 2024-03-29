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
const BaseGenerator_1 = __importDefault(require("./BaseGenerator"));
class SelectGenerator extends BaseGenerator_1.default {
    constructor() {
        super("SelectGenerator");
    }
    // 필수 값 확인 user 정보, query type, table명, column명
    selectQeury(Request) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = Request;
            this.GenLogger.log("info", JSON.stringify(Request));
            const columnsArray = Object.entries(body.column).map(([key, value]) => {
                return `${key} AS ${value}`;
            });
            const columnString = columnsArray.join(", ");
            let result = `SELECT ${columnString} FROM ${body.table} `;
            // WHERE 절 처리
            let whereConditions = "";
            if (Request.where && Request.where.length) {
                for (let i = 0; i < Request.where.length; i++) {
                    const { column, operator, condition } = Request.where[i];
                    if (condition !== undefined) { // condition가 undefined가 아닌 경우에만 처리
                        const formattedValue = typeof condition === "number" ? condition : `'${condition}'`;
                        whereConditions += (whereConditions ? " AND " : "") + `${column} ${operator} ${formattedValue}`;
                    }
                }
            }
            if (whereConditions) {
                result += ` WHERE ${whereConditions}`;
            }
            // SORT 절 처리
            if (Request.sort && Request.sort.length) {
                const orderByConditions = Request.sort.reduce((acc, { column, operator = "ASC" }, index) => {
                    const prefix = index > 0 ? ", " : ""; // 첫 번째 조건이 아닌 경우 "," 추가
                    return `${acc}${prefix}${column} ${operator}`;
                }, "");
                result += ` ORDER BY ${orderByConditions}`;
            }
            // 최종 SQL 쿼리 문자열 생성
            this.GenLogger.log("info", JSON.stringify(result));
            return result;
        });
    }
}
exports.default = SelectGenerator;
