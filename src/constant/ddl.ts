import Base from "../base";

export default class DDLConstant extends Base {
  constructor() {
    super();
  }

  static CREATE_TABLE_TEMPLATE = {
    START: "CREATE TABLE %tableName% (",
    END: ");",
    SEPARATOR: ", ",
  };

  static VARCHAR = "VARCHAR(%length%)";
  static IS_NULL = "DEFAULT NULL";
  static IS_NOT_NULL = "NOT NULL";
}
