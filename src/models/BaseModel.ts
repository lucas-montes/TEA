import { invoke } from '@tauri-apps/api/tauri';

export default class BaseModel {
    id!: number;
    createdAt?: string;
    updatedAt!: string;

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

    public static serializeModel(entry: any) {
        let newEntry = new this();
        Object.entries(entry).forEach(([key, value]) => {
            if (typeof value == "string") {
                if (value.startsWith('"')) { value = value.slice(1) }
                if (value.endsWith('"')) { value = value.slice(0, -1) }
            }
            if (key === "pros" || key === "cons") {
                if (value === "") { value = []; } else { value = value.split(","); }
            };
            newEntry[key] = value;
        });
        return newEntry;
    }

    public static serializeModels(entries: any): Array<any> {
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

export class BaseText extends BaseModel {
    title?: string;
    content: string;

    constructor(title?: string, content: string = "", createdAt?: string) {
        super();
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
} 
