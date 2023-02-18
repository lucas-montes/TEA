import { BaseText } from "./BaseModel";

export default class Note extends BaseText {
    getAll(): Promise<unknown> {
        return this.handleModel("read")
    }
};
