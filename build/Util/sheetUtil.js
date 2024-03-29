"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
const base_1 = __importDefault(require("../base"));
const logUtil_1 = __importDefault(require("./logUtil"));
class SheetUtil extends base_1.default {
    constructor() {
        super();
        this.objSheetData = {};
        this.Logger = new logUtil_1.default("SheetUtil");
        this.Logger.log("info", "get SheetUtil");
    }
    clearSheetData() {
        this.objSheetData = {};
    }
    getSheetData() {
        return this.objSheetData;
    }
    setSheetData(filePath) {
        this.clearSheetData();
        const workbook = xlsx_1.default.readFile(filePath);
        for (let i = 0; i < workbook.SheetNames.length; i++) {
            const sheetName = workbook.SheetNames[i];
            Object.assign(this.objSheetData, {
                [sheetName]: xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheetName]),
            });
        }
    }
}
exports.default = SheetUtil;
// JSON으로 템플릿.xlsx 파일을 생성하는 코드
// const wb = sheetJs.utils.book_new();
// const newWorkSheet = sheetJs.utils.json_to_sheet("JSON Data");
// sheetJs.utils.book_append_sheet(wb, newWorkSheet, "template");
// sheetJs.writeFile(wb, "path");
