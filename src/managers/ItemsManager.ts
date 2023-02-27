import allApps, { kanban } from "../constants/Apps";
import { SessionStorageManagerStatic } from "./SessionStorageManager";


export default class ItemsManager {
    static sessionStorageKey: string = "items";
    static sessionStorageKeySingleItem: string = "item";
    static sessionStorage = SessionStorageManagerStatic;

    static saveAllItems(items: Array<any>) {
        this.sessionStorage.setValue(this.sessionStorageKey, items)
    };

    static saveItem(item: any) {
        this.sessionStorage.setValue(this.sessionStorageKeySingleItem, item)
    };

    static getItemFromList(itemId: number) {
        const item = this.getItems().find(({ id }) => id === itemId);
        this.saveItem(item)
        return item
    };

    static checkCorrectItem(itemId: number, currentItem: any) {
        return currentItem.id == itemId;
    };

    static getItem(currentPath: object) {
        const itemId = parseInt(currentPath.Id)
        let item = this.sessionStorage.getValue(this.sessionStorageKeySingleItem);
        if (item === "" || !this.checkCorrectItem(itemId, item)) {
            item = this.getItemFromList(itemId);
        }
        console.log(item)
        return item;
    };

    static getItems(): Array<any> {
        try {
            return this.sessionStorage.getValue(this.sessionStorageKey);
        }
        catch (error) {
            console.log(error);
            return [];
        };
    };

    static replaceItems(items: Array<any>) {
        this.sessionStorage.replaceValue(this.sessionStorageKey, items);
    };

    static replaceItem(item: any) {
        this.sessionStorage.replaceValue(this.sessionStorageKeySingleItem, item);
    };


};
