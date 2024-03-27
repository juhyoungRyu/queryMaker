import sheetJs, { WorkSheet } from "xlsx";

import Base from "../Base";
import LogUtil from "./LogUtil";

import type { TableInfo } from "../Interface/Table";

interface objSheetData {
  [sheetName: string]: TableInfo[];
}

export default class SheetUtil extends Base {
  private objSheetData: objSheetData;
  private Logger: LogUtil;

  constructor() {
    super();
    this.objSheetData = {};
    this.Logger = new LogUtil("SheetUtil");

    this.Logger.log("info", "get SheetUtil");
  }

  private clearSheetData(): void {
    this.objSheetData = {};
  }

  public getSheetData(): objSheetData {
    return this.objSheetData;
  }

  public setSheetData(filePath: string): void {
    this.clearSheetData();
    const workbook: WorkSheet = sheetJs.readFile(filePath);

    for (let i = 0; i < workbook.SheetNames.length; i++) {
      const sheetName = workbook.SheetNames[i];

      Object.assign(this.objSheetData, {
        [sheetName]: sheetJs.utils.sheet_to_json(workbook.Sheets[sheetName]),
      });
    }
  }
}

// JSON으로 템플릿.xlsx 파일을 생성하는 코드
// const wb = sheetJs.utils.book_new();
// const newWorkSheet = sheetJs.utils.json_to_sheet("JSON Data");
// sheetJs.utils.book_append_sheet(wb, newWorkSheet, "template");

// sheetJs.writeFile(wb, "path");
