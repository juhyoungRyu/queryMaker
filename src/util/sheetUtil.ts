import Base from "../base";
import sheetJs, { WorkSheet } from "xlsx";
import logUtil from "./LogUtil";

import { type tableSheet } from "../interface/tableSheet";

interface objSheetData {
  [sheetName: string]: tableSheet[];
}

export default class Sheet extends Base {
  private objSheetData: objSheetData;
  private logger: logUtil;

  constructor() {
    super();
    this.objSheetData = {};
    this.logger = new logUtil("SheetUtil");

    this.logger.log("info", "get SheetUtil");
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
