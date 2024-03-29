import BaseModel from "./BaseModel";
import type { Response } from "../interface/module";

export default class ResponsetModel extends BaseModel {
  protected statusCode: number;
  protected response: Response;

  constructor(response: Response, code?: number) {
    super("ResponsetModel");
    this.response = response;
    this.statusCode = code ? code : 200;
  }

  public createTable(query: string) {
    this.response.body = {
      success: this.statusCode === 200 ? true : false,
      query,
    };

    return this.response;
  }

  public createSelect(result: string){
    this.response.body = {
      success: this.statusCode === 200 ? true : false,
      result
    }
    return this.response;
  }
}
