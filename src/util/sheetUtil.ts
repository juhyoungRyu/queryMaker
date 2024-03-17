import Base from "../base";
import sheetJs, { WorkSheet } from "xlsx";
import logUtil from "../util/logUtil";

type SheetData = Array<Object>;
interface objSheetData {
  [sheetName: string]: SheetData[];
}

export default class sheetUtil extends Base {
  private objSheetData: objSheetData;
  private logger: logUtil;

  constructor() {
    super();
    this.objSheetData = {};
    this.logger = new logUtil("sheetUtil");

    this.logger.log("info", "get sheetUtil");
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
