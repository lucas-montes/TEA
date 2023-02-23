import Note from "../../../../models/Note";
import BaseAppContentBar from "./BaseAppContentBar";

export default class AppContentBarNotes extends BaseAppContentBar {
    getModel(): Note {
        return new Note();
    }
}
