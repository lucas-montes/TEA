import BaseModel from "./BaseModel";


export default class MenuApp extends BaseModel {
    icon: JSX.Element
    className: string
    tooltipClassName: string
    tooltipText: string
    onClickMethod: Function
    items: Array<AppItem>

    constructor(
        icon: JSX.Element,
        position: string = "",
        className: string = "sidebar-icon group",
        tooltipClassName: string = "sidebar-tooltip group-hover:scale-100",
        tooltipText: string = "",
        onClickMethod: Function | null = null,
        items: Array<AppItem> = [],

    ) {
        super();
        this.icon = icon;
        this.className = this.createClassName(className, position);
        this.tooltipClassName = tooltipClassName;
        this.tooltipText = tooltipText;
        this.onClickMethod = this.setOrCreateOnClickMethod(onClickMethod);
        this.items = items;
    }

    createClassName(className: string, position: string): string {
        return className + " " + position
    }

    doNothing(props: any): void { }

    setOrCreateOnClickMethod(onClickMethod: Function | null): Function {
        if (onClickMethod === null) {
            return this.doNothing
        }
        else {
            return onClickMethod
        }

    }
}



export class AppItem extends BaseModel {
    constructor() {
        super();
    }
};
