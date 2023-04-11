import { BaseText } from "./BaseModel";


export class Schedule extends BaseText {
    startTime: string;
    endTime: string;

    constructor(title?: string, content: string = "", startTime: string, endTime: string) {
        super(title, content);
        this.startTime = startTime;
        this.endTime = endTime;
    }
};

