import { BaseText } from "./BaseModel";


export class Schedule extends BaseText {
    startTime: string;
    endTime: string;
    color: string;
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

    constructor(
        title: string,
        startTime: string,
        endTime: string,
        color: string,
        day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday',
        content = "",
        createdAt?: string
    ) {
        super(title, content);
        this.startTime = startTime;
        this.endTime = endTime;
        this.color = color;
        this.day = day;
        this.createdAt = createdAt;
    }
};

