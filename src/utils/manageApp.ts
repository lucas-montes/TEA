import LocalStorage from "./manageLocalStorage";


export default class AppManager {
    localStorage: LocalStorage;
    defaultApp: string = "kanban";
    localStorageKey: string = "currentApp";

    constructor() {
        this.localStorage = new LocalStorage();
    }

    getLatestAppUsed(): string {
        try {
            return this.localStorage.getValue(this.localStorageKey);
        }
        catch (error) {
            console.log(error);
            return this.defaultApp;
        };
    }

    setCurrentApp(currentApp: string): void {
        this.localStorage.replaceValue(this.localStorageKey, currentApp)
    }
}
