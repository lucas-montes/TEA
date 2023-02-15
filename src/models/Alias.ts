import BaseModel from "./BaseModel";
import { invoke } from '@tauri-apps/api/tauri';
import { FileResult } from "../types/Files";


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

    static getAll(): Promise<Array<FileResult>> {
        return invoke('show_files', { directory: "/home/lucas/BashFast" })
    }
};

export class AliasCategory extends BaseModel {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
};