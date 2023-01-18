import { invoke } from '@tauri-apps/api/tauri'


export default class BaseModel {
    createdAt: Date;

    constructor(
        createdAt: Date
    ) {
        this.createdAt = createdAt;
    };

    save() {
        invoke('save_model', { model: JSON.stringify(this) })
    };
};
