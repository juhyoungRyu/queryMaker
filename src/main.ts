import { writeFile } from "fs";

// Koa
import Koa from "koa";
import Koa_Router from "@koa/router";

// constant
import DDLConstant from "./constant/ddl";

// util
import LogUtil from "./util/LogUtil";
import CliUtil from "./util/CliUil";
import SheetUtil from "./util/SheetUtil";

// type
import { TableInfo } from "./interface/table";

const Logger = new LogUtil("main");
const Cli = new CliUtil();
const Sheet = new SheetUtil();

const Server = new Koa();
const Router = new Koa_Router();

/* makeQuery : cli 기반 동작
 * 1. excel 기반 CREATE TABLE 쿼리 생성
 */
// async function makeQuery() {
//   const result = await Cli.question(
//     "text",
//     "Please input the file path of your table blueprint (Absolute Path) : "
//   );

//   if (!result.success || (result.success && result.path === "")) {
//     Logger.log("error", `The file does not exist in that path.`);
//     return;
//   }

//   Logger.log("info", `File Path : ${result.path}`);
//   Logger.log("line");
//   Sheet.setSheetData(result.path);

//   // sheet 데이터
//   const objSheet = Sheet.getSheetData();
//   // 테이블명 배열
//   const arrTableName = Object.keys(objSheet);
// }

async function createTableQuery(tableName: string, tableData: TableInfo) {
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
