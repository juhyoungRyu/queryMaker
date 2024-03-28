import Base from "../base";
import CreateGenerator from "./create";
import SelectGenerator from "./select";

export default class CoreGenerator extends Base {
  constructor() {
    super();
  }

  get Create() {
    return new CreateGenerator();
  }

  get Select() {
    return new SelectGenerator();
  }
}
