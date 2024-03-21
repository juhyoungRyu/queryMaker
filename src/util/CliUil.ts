import Base from "../base";
import { prompt } from "prompts";
import Logger from "./LogUtil";

type PromptType = "text" | "confirm" | "list" | "select";
type Result<T> = T extends true
  ? { success: true; path: string }
  : { success: false; path: undefined };

export default class CLI extends Base {
  private logger: Logger;

  constructor() {
    super();
    this.logger = new Logger("CliUtil");
  }

  public async question(
    type: PromptType,
    message: string
  ): Promise<Result<true | false>> {
    let result = {} as Result<true | false>;

    try {
      const { question } = await prompt({
        type,
        name: "question",
        message,
      });
      this.logger.log("success", `Answer : ${question}`);

      result = { success: true, path: question };
    } catch (error: any) {
      result.success = false;
      this.logger.log("error", error.message);
    }

    return result;
  }
}
