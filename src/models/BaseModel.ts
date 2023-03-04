import { invoke } from '@tauri-apps/api/tauri';

export default class BaseModel {
    id?: Number;
    createdAt?: string;

    constructor() { }

    getModelName(): string {
        return this.constructor.name.toLowerCase();
    }

    getTableName(): string {
        let name = this.getModelName();
        if (!name.endsWith('s')) { name = `${name}s`; };
        return name;
    }

    getCreateData() {
        this.createdAt = new Date().toLocaleString();
        let createdData = this;
        return createdData
    }

    create(): Promise<unknown> {
        const createData = this.getCreateData();
        return invoke("handle_create", { table: this.getTableName(), modelData: JSON.stringify(createData) });
    }

    delete(id: Number): Promise<unknown> {
        return invoke("handle_delete", { table: this.getTableName(), id: id });
    }

    update(id: Number, props: any): Promise<unknown> {
        return invoke("handle_update", { table: this.getTableName(), id: id, modelData: JSON.stringify(props) });
    }

    getAll(): Promise<unknown> {
        let table = this.getTableName();
        return invoke(`handle_read_${table}`);
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