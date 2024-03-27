import Base from "../Base";
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
