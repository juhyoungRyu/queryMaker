import Base from "../base";
import Logger from "./logUtil";

export default class StringUtil extends Base {
  protected Logger: Logger;

  constructor() {
    super();
    this.Logger = new Logger("StringUtil");
  }

  public Concat(...sReq: string[]) {
    if (sReq.length === 0) {
      this.Logger.log("error", "Request String is Empty");
      return "";
    }

    let attachString = sReq[0];

    for (let i = 1, maxLength = sReq.length; i < maxLength; i++) {
      attachString += sReq[i];
    }

    this.Logger.log("success", "concatenation");

    return attachString;
  }
}
