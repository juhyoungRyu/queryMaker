// util
import LogUtil from "./util/LogUtil";
import CliUtil from "./util/CliUil";
import SheetUtil from "./util/SheetUtil";

// type
import { TableInfo } from "./interface/table";

const Logger = new LogUtil("main");
const Cli = new CliUtil();
const Sheet = new SheetUtil();

// cli 방식으로 이후 기능 추가
/* makeQuery
 * 1. excel 기반 table 생성 쿼리
 */

async function makeQuery() {
  const result = await Cli.question(
    "text",
    "Please input the file path of your table blueprint (Absolute Path) : "
  );

  if (!result.success || (result.success && result.path === "")) {
    Logger.log("error", `The file does not exist in that path.`);
    return;
  }

  Logger.log("info", `File Path : ${result.path}`);
  Logger.log("line");
  Sheet.setSheetData(result.path);

  // sheet 데이터
  const objSheet = Sheet.getSheetData();
  // 테이블명 배열
  const arrTableName = Object.keys(objSheet);
}

async function createTableQuery(tableName: string, tableData: TableInfo) {}

makeQuery();
