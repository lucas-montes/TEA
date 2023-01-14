
export default class LocalStorage {
    constructor() { }

    setValue(key: string, value: any): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    getValue(key: string): any { return window.localStorage.getItem(key); };

    replaceValue(key: string, value: any): any {
        let oldValue = window.localStorage.getItem(key);
        this.setValue(key, value);
        return oldValue;
    };
}
