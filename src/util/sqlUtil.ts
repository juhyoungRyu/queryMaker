import Base from "../base";
import Logger from "./logUtil";
import { createConnection, type Connection, type ConnectionConfig } from "mysql";

const DEFAULT_CONNECTION: ConnectionConfig = {
  host: "localhost",
  port: 3306,
  database: "console",
  user: "calsadmin",
  password: "calsadmin1!",
};

export default class DAUtil extends Base {
  private connection: Connection;
  private logger: Logger;

  constructor(connectionInfo?: ConnectionConfig) {
    super();
    this.logger = new Logger("sqlUtil");
    this.logger.log("info", "get DAUtil");

    try {
      if (connectionInfo === undefined) {
        this.connection = createConnection({ ...DEFAULT_CONNECTION });
      } else {
        this.connection = createConnection({ ...connectionInfo });
      }
    } catch (error: any) {
      this.logger.log("fail", "Fail createConnection");
      throw new Error("createConnection");
    }

    this.connection.connect();
    this.logger.log("success", "Start Connection");
  }

  public endConnection() {
    this.logger.log("success", "End Connection");
    this.connection.end();
  }

  public startTransaction() {
    this.connection.beginTransaction();
  }

  public commitTransaction() {
    this.connection.commit();
  }

  public rollbackTransaction() {
    this.connection.rollback();
  }

  public async excuteQuery(query: string) {
    // return this.connection.query(query);

    this.connection.query("SELECT 1 + 1 AS solution", async function (error, results) {
      if (error) throw error;
      console.log("The solution is: ", results);
      return results;
    });
  }
}
