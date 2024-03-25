import { prompt } from "prompts";
import { writeFile } from "fs";
import SheetUtil from "./util/sheetUtil";
import LogUtil from "./util/logUtil";
import DDLConstant from "./constant/ddl";

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

  const createTableQuery: string[] = [];

  for (let i = 0; i < arrTableName.length; i++) {
    const arrRowData = objSheet[arrTableName[i]];

    const arrCreateQuery: string[] = [
      DDLConstant.CREATE_TABLE_TEMPLATE.START.replace("%tableName%", arrTableName[i]),
    ];
    const arrColumnQuery: string[] = [];

    arrRowData.forEach((row) => {
      if (row.Type === "VARCHAR") {
        row.sType = DDLConstant.VARCHAR.replace("%length%", row.Length);
      } else {
        row.sType = undefined;
      }

      if (row.NULL === "0") {
        row.sNull = DDLConstant.IS_NOT_NULL;
      } else {
        row.sNull = DDLConstant.IS_NULL;
      }

      arrColumnQuery.push(`${row.Field} ${row.sType ? row.sType : row.Type} ${row.sNull}`);
    });

    arrCreateQuery.push(arrColumnQuery.join(DDLConstant.CREATE_TABLE_TEMPLATE.SEPARATOR));
    arrCreateQuery.push(DDLConstant.CREATE_TABLE_TEMPLATE.END);

    createTableQuery.push(arrCreateQuery.join(""));
  }

  writeFile("result/query.sql", createTableQuery[0], "utf-8", async (error) => {
    if (error) throw error;

    console.log("success");
  });
}

// C:\Users\sia\Desktop\table_generate\test/1.xlsx
makeQuery();
