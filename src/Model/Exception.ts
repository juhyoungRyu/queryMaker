import BaseModel from "./BaseModel";

export default class ExceptionModel extends BaseModel {
  constructor(exceptionName: string) {
    super(exceptionName);
  }
}
