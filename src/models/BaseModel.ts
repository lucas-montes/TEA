import { invoke } from '@tauri-apps/api/tauri';

export default abstract class BaseModel {
    id!: number;
    createdAt?: string;
    updatedAt?: string;

    public static getModelName(): string {
        return this.constructor.name.toLowerCase();
    }

    public getModelName(): string {
        return this.constructor.name.toLowerCase();
    }

    public getTableName(): string {
        let name = this.getModelName();
        if (!name.endsWith('s')) { name = `${name}s`; }
        return name;
    }

    public getCreateData(): any {
        // @ts-ignore
        this.id = undefined;
        const now = new Date().toLocaleString();
        this.createdAt = now;
        this.updatedAt = now;
        return this;
    }

    public async create(): Promise<number> {
        console.log(this.getCreateData());
        return await invoke(
            "handle_create",
            {
                table: this.getTableName(),
                modelData: JSON.stringify(this.getCreateData()),
            }
        );
    }

    public async delete(id: number): Promise<number> {
        return await invoke("handle_delete", { table: this.getTableName(), id: id });
    }

    public async update(id: number, props: any = {}): Promise<number> {
        props["updatedAt"] = new Date().toLocaleString();
        return await invoke("handle_update", { table: this.getTableName(), id: id, modelData: JSON.stringify(props) });
    }

    public async read(): Promise<Array<any>> {
        let table = this.getTableName();
        return await invoke(`handle_read_${table}`);
    }

    public static updateValueSerializer({ key, value }: { key: string, value: any }): any {
        return value
    }

    public static serializeModel<T>(entry: object): T {
        let newEntry: T = new this();
        Object.entries(entry).forEach(([key, value]) => {
            newEntry[key] = this.updateValueSerializer({ key, value });
        });
        return newEntry;
    }

    public static serializeModels(entries: Array<object>): Array<any> | object {
        const newEntries: Array<any> = [];
        for (let i = 0; i < entries.length; i++) {
            newEntries.push(this.serializeModel(entries[i]));
        }
        return newEntries;
    }

    public static async getAll() {
        return new this().read()
            .then((entries: Array<any>) => { return this.serializeModels(entries) })
            .catch((error: any) => {
                console.error(error);
                return [];
            })
    }

};

export abstract class BaseText extends BaseModel {
    title?: string;
    content: string;

    constructor(title?: string, content = "", createdAt?: string, updatedAt?: string) {
        super();
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
} 
