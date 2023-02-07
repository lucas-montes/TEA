import { BaseText } from "./BaseModel";

export default class Note extends BaseText {

    constructor(
        title: string,
        content: string,
        createdAt: Date
    ) {
        super(
            title, content, createdAt
        );
    }
};
