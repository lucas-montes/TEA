import { invoke } from '@tauri-apps/api/tauri'

export default class BaseModel {
    id?: Number | null = null;
    createdAt: string | null = null;
    tableName: string;

    constructor() { this.tableName = this.getTableName() }

    getTableName(): string {
        return this.constructor.name.toLowerCase()
    }

    create(): void {
        this.createdAt = new Date().toLocaleString();
        delete this.id;
        invoke('save_model', { invokeMessage: JSON.stringify(this) })
    }

    static get(id: Number) { }

    static delete(id: Number): void { }

    static update(props: any) { }

    static getAll() { }

    static filter(props: any) { }
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