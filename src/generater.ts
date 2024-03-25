// select logic 
import Base from "./base";
import Logger from "../src/util/LogUtil";

export class generate extends Base{
    private logger: Logger

    constructor() {
        super();
        this.logger = new Logger("Select");
      }
}