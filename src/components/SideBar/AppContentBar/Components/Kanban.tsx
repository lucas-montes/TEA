import KanbanTicket from "../../../../models/KanbanTicket";
import BaseAppContentBar from "./BaseAppContentBar";

export default class AppContentBarKanban extends BaseAppContentBar {
    getModel(): KanbanTicket {
        return new KanbanTicket();
    }
}
