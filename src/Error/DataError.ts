import BaseError from "./BaseError";

export default class DataError extends BaseError {
  constructor(message: string) {
    super("DataError");
  }
}
