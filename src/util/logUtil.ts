import Base from "../base";

const TYPE = {
  error: "ERROR",
  info: "INFO",
  success: "SUCCESS",
  fail: "FAIL",
  line: "",
};

export default class Logger extends Base {
  private template: string;

  constructor(caller: string) {
    super();
    this.template = `%timestamp% [${caller}][%type%] %message%`;
  }

  private getTime(): string {
    return this.Moment().format("YYYY/MM/DD HH:mm:ss");
  }

  public log(type: keyof typeof TYPE, message?: any): void {
    let msg = this._.cloneDeep(this.template);

    msg = msg
      .replace(/%type%/gm, TYPE[type])
      .replace(/%timestamp%/gm, this.getTime())
      .replace(/%message%/gm, message);

    if (type === "line") {
      console.error("---------------------------------------------------");
    } else if (type === "error") {
      console.error(msg);
    } else if (type === "fail") {
      console.warn(msg);
    } else {
      console.log(msg);
    }
  }
}
