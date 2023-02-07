import { BaseText } from "./BaseModel";

export default class KanbanTicket extends BaseText {
    ticketStatus: string;

    constructor(
        title: string,
        content: string,
        ticketStatus: string,
        createdAt: Date
    ) {
        super(
            title, content, createdAt
        );
        this.ticketStatus = ticketStatus;
    }
};
