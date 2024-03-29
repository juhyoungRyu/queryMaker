import BaseRouter from "./BaseRouter";

import CoreGenerator from "../Generator/Core";
import { SelectInfo } from "../interface/select"
/**
 * SelectRouter
 * @path /select
 * @example
 * Router.API.use('/select', SelectRouter())
 */
export function SelectRouter() {
  const selectRouter = new BaseRouter();
  const QueryMaker = new CoreGenerator().Select;

  selectRouter.API.post("/createQuery", async (ctx) => {
    selectRouter.Logger.log("start", "Select Query Create");
    selectRouter.Logger.log("start", JSON.stringify(ctx.request?.body))
    const result = await QueryMaker.selectQeury(ctx.request.body as SelectInfo);
    selectRouter.Logger.log("start", `Select Query Create ${result}`);
    return result;
  });

  return selectRouter;
}
