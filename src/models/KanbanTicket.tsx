import BaseModel from "./BaseModel";

export default class KanbanTicket extends BaseModel {
    title: string;
    content: string;
    ticketStatus: string;

    constructor(
        title: string,
        content: string,
        ticketStatus: string,
        createdAt: Date
    ) {
        super(createdAt);
        this.title = title;
        this.content = content;
        this.ticketStatus = ticketStatus;
    }
};
