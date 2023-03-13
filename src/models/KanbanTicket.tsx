import { BaseText } from "./BaseModel";
import {kanbanTickets} from "../constants/testConstants";

export default class KanbanTicket extends BaseText {
    ticketStatus?: string;
    defaultData = kanbanTickets;

    constructor(
        title?: string,
        content: string = "",
        ticketStatus?: string,
    ) {
        super(
            title, content
        );
        this.ticketStatus = ticketStatus;
    }
};
