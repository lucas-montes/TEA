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
        this.createdAt = new Date().toLocaleString();
        return this;
    }

    public async create(): Promise<number> {
        return Math.floor(Math.random() * 918165161)
        const createData = this.getCreateData();
        return await invoke("handle_create", { table: this.getTableName(), modelData: JSON.stringify(createData) });
    }

    public async delete(id: number): Promise<number> {
        return await invoke("handle_delete", { table: this.getTableName(), id: id });
    }

    public async update(id: number, props: any = {}): Promise<number> {
        return id
        props["updatedAt"] = new Date().toLocaleString();
        return await invoke("handle_update", { table: this.getTableName(), id: id, modelData: JSON.stringify(props) });
    }

    public async read(): Promise<Array<any>> {
        let table = this.getTableName();
        return await invoke(`handle_read_${table}`);
    }

    public serializeModel(entry: any): this {
        let newEntry: this = this;
        Object.entries(entry).forEach(([key, value]) => {
            if (key === "pros" || key === "cons") {
                if (value === "") { value = []; } else { value = value.split(","); }
            };
            this[key] = value;
        });
        return newEntry;
    }

    public serializeModels(entries: any): Array<this> {
        let newEntries: Array<this> = [];
        entries.map((value: this) => newEntries.push(this.serializeModel(value)));
        return newEntries;
    }

    public async getAll() {
        return this.read()
            .then((entries: Array<any>) => { return this.serializeModels(entries) })
            .catch((error: any) => {
                // console.error(error);
                return [];
            })
    }

};

export class BaseText extends BaseModel {
    title: string;
    content: string;

    constructor(title: string, content: string = "", createdAt?: string) {
        super();
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}; 
