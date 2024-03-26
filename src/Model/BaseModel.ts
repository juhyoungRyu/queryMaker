import Base from "../base";
import Logger from "../Util/logUtil";

export default class BaseModel extends Base {
  private Logger: Logger;
  public ModelName: string;

  constructor(name: string) {
    super();
    this.Logger = new Logger(name);
    this.ModelName = name;
  }

  public modelLog(...[type, message]: Parameters<typeof this.Logger.log>) {
    this.Logger.log(type, message ? message : "");
  }
}
