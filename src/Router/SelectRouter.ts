import BaseRouter from "./BaseRouter";
import CoreGenerator from "../Generator/Core";

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
    const result = await QueryMaker.selectQeury(ctx.request);
    return result;
  });

  return selectRouter;
}
