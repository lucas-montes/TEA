import { BaseText } from "./BaseModel";

export default class KanbanTicket extends BaseText {
    ticketStatus: string;

    constructor(
        title: string,
        content: string,
        ticketStatus: string,
    ) {
        super(
            title, content
        );
        this.ticketStatus = ticketStatus;
    }
};
