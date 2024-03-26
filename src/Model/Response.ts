import BaseModel from "./BaseModel";

interface Response<T> {
  statusCode: number;
  body: T;
}

export default class ResponsetMode extends BaseModel {
  private statusCode: number;

  constructor(name: string, code?: number) {
    super(name);
    this.statusCode = code ? code : 200;
  }

  public createTable(query: string) {
    const res: Response<{ query: string }> = {
      statusCode: this.statusCode,
      body: {
        query,
      },
    };

    return res;
  }
}
