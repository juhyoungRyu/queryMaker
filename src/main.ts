import Koa from "koa";
import Koa_Router from "@koa/router";

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

async function createTableQuery(tableName: string, tableData: TableInfo) {}

Router.get("/", (ctx) => {
  ctx.body = "Hello, World";
});

Server.use(Router.routes()).use(Router.allowedMethods());

Server.listen(3000);
