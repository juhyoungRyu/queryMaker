import ResponsetMode from "../Model/Response";
import BaseRouter from "./BaseRouter";

import CoreGenerator from "../Generator/Core";
const QueryMaker = new CoreGenerator().Create;

import type { CreateTableRequest } from "../interface/table";

/**
 * TableRouter
 * @path /table
 * @example
 * Router.API.use('/createTable', TableRouter())
 */
export function TableRouter() {
  const tableRouter = new BaseRouter();

  tableRouter.API.post("/createQuery", async (ctx) => {
    tableRouter.Logger.log("start", "createQuery");

    const query = await createQuery(ctx.request?.body as CreateTableRequest);

    ctx.response = new ResponsetMode(ctx.response).createTable(query);

    tableRouter.Logger.log("success", "createQuery");
    return;
  });

  return tableRouter;
}

async function createQuery(body: CreateTableRequest): Promise<string> {
  let query = "";
  const arrTableName = Object.keys(body);

  for (let i = 0, maxLength = arrTableName.length; i < maxLength; i++) {
    const tableName = arrTableName[i];
    query += await QueryMaker.createTableQuery(tableName, body[tableName]);
  }

  return query;
}
