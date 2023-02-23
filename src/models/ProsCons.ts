import BaseModel from "./BaseModel";


export default class ProsCons extends BaseModel {
    title?: string;
    description?: string;
    pros?: Array<string>;
    cons?: Array<string>;

    constructor(title?: string, description?: string, pros?: Array<string>, cons?: Array<string>) {
        super();
        this.title = title;
        this.description = description;
        this.pros = pros;
        this.cons = cons;
    }
};
