import BaseModel from "./BaseModel";


export default class Alias extends BaseModel {
    name: string;
    description: string;
    category: AliasCategory;

    constructor(name: string, description: string, category: AliasCategory) {
        super();
        this.name = name;
        this.description = description;
        this.category = category;
    }
};

export class AliasCategory extends BaseModel {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
};