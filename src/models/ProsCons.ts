import { BaseText } from "./BaseModel";


export default class ProsCons extends BaseText {
    pros?: Array<string>;
    cons?: Array<string>;

    constructor(title: string, content = "", pros: Array<string> = [""], cons: Array<string> = [""]) {
        super(title, content);
        this.pros = pros;
        this.cons = cons;
    }

    private createNewMap(newMap: any, key: string, value: any): void {
        if (key === "pros" || key === "cons") {
            value = value.join()
        }
        newMap[key] = value;
    }

    public override getCreateData(): any {
        const createdData = {};
        Object.entries(this).forEach(([key, value]) => this.createNewMap(createdData, key, value));
        return createdData
    }

    public static override updateValueSerializer({ key, value }: { key: string, value: any }): any {
        if (key === "pros" || key === "cons") {
            if (value === "") { value = []; } else { value = value.split(","); }
        }
        return value;
    }
}
