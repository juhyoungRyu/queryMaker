import { prompt } from "prompts";
import SheetUtil from "./util/sheetUtil";
import LogUtil from "./util/logUtil";

const sheetUtil = new SheetUtil();
const logger = new LogUtil("main");

// cli 방식으로 이후 기능 추가
/* makeQuery
 * 1. excel 기반 table 생성 쿼리
 */

async function makeQuery() {
  const { filePath } = await prompt({
    type: "text",
    name: "filePath",
    message: "Please input the file path of your table blueprint (Absolute Path) : ",
  });

  if (!filePath) {
    logger.log("error", `The file does not exist in that path.`);
    return;
  }

  logger.log("info", `File Path : ${filePath}`);
  console.log("---------------------------------------------------");
  sheetUtil.setSheetData(filePath);

  const arrTableName = Object.keys(sheetUtil.getSheetData());
  const objSheet = sheetUtil.getSheetData();

  for (let i = 0; i < arrTableName.length; i++) {
    const arrSheetData = objSheet[arrTableName[i]];

    arrSheetData.forEach((row) => {
      logger.log("info", JSON.stringify(row));
    });
  }
}

// C:\Users\sia\Desktop\table_generate\test/1.xlsx
makeQuery();
