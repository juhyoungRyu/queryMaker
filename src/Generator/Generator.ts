import Base from "../base";
import CreateGenerator from "./Create";
import SelectGenerator from "./Select";

export default class Generator extends Base {
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
