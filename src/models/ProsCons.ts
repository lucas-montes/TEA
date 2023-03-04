import { BaseText } from "./BaseModel";


export default class ProsCons extends BaseText {
    pros?: Array<string>;
    cons?: Array<string>;

    constructor(title?: string, content?: string, pros?: Array<string>, cons?: Array<string>) {
        super(title, content);
        this.pros = pros;
        this.cons = cons;
    }

    getCreateData() {
        this.createdAt = new Date().toLocaleString();
        let createdData = this;
        createdData.pros = createdData.pros.join()
        createdData.cons = createdData.cons.join()
        return createdData
    }
};
