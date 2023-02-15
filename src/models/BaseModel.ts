import { invoke } from '@tauri-apps/api/tauri';
import { FileResult } from "../types/Files";

export default class BaseModel {
    id?: Number;
    createdAt?: string;
    tableName: string;

    constructor() { this.tableName = this.getTableName() }

    getTableName(): string {
        return this.constructor.name.toLowerCase()
    }

    // Maybe use "this" and don't make methods static
    static handleModel(method: "create" | "update" | "read" | "delete", modelData: any): Promise<unknown> {
        return invoke('handle_models', { method: method, modelData: JSON.stringify(modelData) })
    }

    create(): Promise<unknown> {
        this.createdAt = new Date().toLocaleString();
        return BaseModel.handleModel("create", this)
    }

    static get(id: Number): Promise<unknown> {
        return this.handleModel("read", { id: id })
    }

    static delete(id: Number): void {
        this.handleModel("delete", { id: id })
    }

    static update(props: any): Promise<unknown> {
        return this.handleModel("update", props)
    }

    static getAll(): Promise<Array<FileResult>> {
        return invoke('show_files', { directory: "/home/lucas/Dev/rusty/main-tools/test_files" })
    }

    static filter(props: any): Promise<unknown> {
        return this.handleModel("read", props)
    }
};

export class BaseText extends BaseModel {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        super();
        this.title = title;
        this.content = content;
    }
}; 