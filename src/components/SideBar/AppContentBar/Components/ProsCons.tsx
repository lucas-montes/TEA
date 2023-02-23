import ProsCons from "../../../../models/ProsCons";
import BaseAppContentBar from "./BaseAppContentBar";

export default class AppContentBarProsCons extends BaseAppContentBar {
    getModel(): ProsCons {
        return new ProsCons();
    }
}