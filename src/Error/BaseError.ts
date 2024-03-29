import Base from "../base";
import Logger from "../util/logUtil";

export default class BaseError extends Base {
  protected Logger: Logger;

  constructor(exceptionName: string) {
    super();
    this.Logger = new Logger(exceptionName);
  }
}
