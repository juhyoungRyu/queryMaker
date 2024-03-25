// select logic 
import Base from "./base";
import Logger from "../src/util/LogUtil";

export class generate extends Base{
    private logger: Logger

    constructor() {
        super();
        this.logger = new Logger("Select");
      }
    // 필수 값 확인 user 정보, query type, table명, column명 
    public async selectQeury(event: any) {
        // select query에 필요한 값에 대해서 확인
        // 쿼리 생성 확인 
        // gpt 검증 확인 (유료)
        // example => 생성 후 return시, 파일 생성 후 전달 화면에 뿌려주기 
    }
}