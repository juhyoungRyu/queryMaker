import Base from "../base";
import Logger from "../util/logUtil";

export default class BaseModel extends Base {
  private Logger: Logger;
  protected ModelName: string;

  constructor(name: string) {
    super();
    this.Logger = new Logger(name);
    this.ModelName = name;
  }

  public modelLog(...[type, message]: Parameters<typeof this.Logger.log>) {
    this.Logger.log(type, message ? message : "");
  }
}
