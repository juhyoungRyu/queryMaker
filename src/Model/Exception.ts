//TODO: middleware 붙여서 후에 처리...

import BaseModel from "./BaseModel";

export default class ExceptionModel extends BaseModel {
  constructor(exceptionName: string) {
    super(exceptionName);
  }

  public DataNotFound(statusCode: number, message: string) {}
}
