import { invoke } from '@tauri-apps/api/tauri';
import { FileResult } from "../types/Files";

export default class BaseModel {
    id: Number = 0;
    createdAt?: string;
    modelName: string;

    constructor() { this.modelName = this.getModelName() }

    getModelName(): string {
        return this.constructor.name.toLowerCase()
    }

    handleModel(method: "create" | "update" | "read" | "delete", modelData?: any): Promise<unknown> {
        return invoke(`handle_${this.modelName}s_${method}`, modelData)
    }

    create(): Promise<unknown> {
        this.createdAt = new Date().toLocaleString();
        return this.handleModel("create", this)
    }

    get(id: Number): Promise<unknown> {
        return this.handleModel("read", { id: id })
    }

    delete(id: Number): void {
        this.handleModel("delete", { id: id })
    }

    update(props: any): Promise<unknown> {
        return this.handleModel("update", props)
    }

    static getAll(): Promise<Array<FileResult>> {
        return invoke('show_files', { directory: "/home/lucas/Dev/rusty/main-tools/test_files" })
    }

};

export class BaseText extends BaseModel {
    title?: string;
    content?: string;

    constructor(title?: string, content?: string) {
        super();
        this.title = title;
        this.content = content;
    }
}; 