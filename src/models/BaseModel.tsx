import { invoke } from '@tauri-apps/api/tauri'


export default class BaseModel {
    id: Number;
    createdAt: Date;

    constructor(
        createdAt: Date
    ) {
        this.id = 0;
        this.createdAt = createdAt;
    };


    save() {
        invoke('save_model', { model: JSON.stringify(this) })
    };
};


export class BaseText extends BaseModel {
    title: string;
    content: string;

    constructor(
        title: string,
        content: string,
        createdAt: Date
    ) {
        super(createdAt);
        this.title = title;
        this.content = content;
    }
}; 