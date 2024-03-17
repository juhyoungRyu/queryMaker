import lodash, { type LoDashStatic } from "lodash";
import moment from "moment";

export default class Base {
  protected _: LoDashStatic;
  protected Moment: typeof moment;

  constructor() {
    this._ = lodash;
    this.Moment = moment;
  }
}
