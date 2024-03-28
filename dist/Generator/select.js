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
            const body = Request.body;
            // if (this._.isEmpty(body.table) || !body.table) {
            //   // table name
            //   body.response.status = 401;
            //   body.response.message = "table";
            //   return;
            // }
            // if (this._.isEmpty(body.column) || body.column) {
            //   // type
            //   body.response.status = 401;
            //   body.response.message = "column";
            //   return;
            // }
            // const columnsArray = Object.entries(body.column).map(([key, value]) => {
            //   return `${key} AS ${value}`;
            // });
            // const columnString = columnsArray.join(", ");
            // // WHERE 조건 처리
            // let whereConditions = body.where
            //   .map(({ column, operator, value }: any) =>
            //     typeof value === "number"
            //       ? `${column} ${operator} ${value}`
            //       : `${column} ${operator} '${value}'`
            //   )
            //   .join(" AND ");
            // if (whereConditions) {
            //   whereConditions = "WHERE " + whereConditions;
            // } else {
            //   whereConditions = "";
            // }
            // // SORT 조건 처리
            // const orderBy = body.sort
            //   .map(({ column, order }: any) => `${column} ${order.toUpperCase()}`)
            //   .join(", ");
            // // 최종 SQL 쿼리 문자열 생성
            // const result = `SELECT ${columnString} FROM ${
            //   body.table
            // } ${whereConditions} ${orderBy ? "ORDER BY " + orderBy : ""}`;
            // return result;
        });
    }
}
exports.default = SelectGenerator;
