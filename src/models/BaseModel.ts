import { invoke } from '@tauri-apps/api/tauri';
import { FileResult } from "../types/Files";

export default class BaseModel {
    id?: Number;
    createdAt?: string;

    constructor() { }

    getModelName(): string {
        let name = this.constructor.name.toLowerCase();
        if (!name.endsWith('s')) { name = `${name}s`; };
        return name;
    }

    handleModel(method: "create" | "update" | "read" | "delete", modelData?: any): Promise<unknown> {
        return invoke(`handle_${method}`, { modelName: this.getModelName(), modelData: JSON.stringify(modelData) })
    }

    create(): Promise<unknown> {
        this.createdAt = new Date().toLocaleString();
        return this.handleModel("create", this);
    }

    get(id: Number): Promise<unknown> {
        return this.handleModel("read", { id: id });
    }

    delete(id: Number): void {
        this.handleModel("delete", { id: id });
    }

    update(props: any): Promise<unknown> {
        return this.handleModel("update", props);
    }

    getAll(): Promise<unknown> {
        return this.handleModel("read");
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