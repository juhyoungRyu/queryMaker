import Base from "../base";

// Koa
import Koa_Router from "@koa/router";

// Util
import Logger from "../util/logUtil";

export default class Router extends Base {
  public API: Koa_Router;
  public Logger: Logger;

  constructor() {
    super();
    this.API = new Koa_Router();
    this.Logger = new Logger("SystemRouter");

    this.API.get("/", (ctx) => {
      ctx.response.body = "Query Maker Server";
    });
  }
}
