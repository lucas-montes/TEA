import BaseModel from "./BaseModel";


export default class MenuApp extends BaseModel {
    icon: JSX.Element
    position: string
    className: string
    tooltipClassName: string
    tooltipText: string
    items: Array<AppItem>

    constructor(
        icon: JSX.Element,
        position: string = "",
        className: string = "sidebar-icon group",
        tooltipClassName: string = "sidebar-tooltip group-hover:scale-100",
        tooltipText: string = "",
        items: Array<AppItem> = [],

    ) {
        super();
        this.icon = icon;
        this.position = position;
        this.className = className;
        this.tooltipClassName = tooltipClassName;
        this.tooltipText = tooltipText;
        this.items = items;
        this.setPositioninClassName()
    }

    setPositioninClassName(): void {
        this.className = this.className + " " + this.position
    }
}



export class AppItem extends BaseModel {
    constructor() {
        super();
    }
};
