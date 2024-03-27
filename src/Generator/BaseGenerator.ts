import Base from "../Base";
import Logger from "../Util/LogUtil";
import type { Request, Response } from "koa";

export default class CreateGenerator extends Base {
  public Request: Request;
  public Response: Response;
  public GenLogger: Logger;

  constructor(GenertorName: string) {
    super();
    this.Request = {} as Request;
    this.Response = {} as Response;
    this.GenLogger = new Logger(GenertorName);
  }
}
