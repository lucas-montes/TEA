import allApps, { kanban } from "../constants/Apps";
import LocalStorageManager from "./LocalStorageManager";


export default class AppManager {
    localStorage: LocalStorageManager;
    defaultApp: string = kanban;
    localStorageKey: string = "currentApp";

    constructor() {
        this.localStorage = new LocalStorageManager();
    };

    getLatestApp(): string {
        try {
            return this.localStorage.getValue(this.localStorageKey);
        }
        catch (error) {
            console.log(error);
            return this.defaultApp;
        };
    };

    setCurrentApp(currentApp: string): void {
        this.localStorage.replaceValue(this.localStorageKey, currentApp);
    };

    fixCorrectApp(latestApp: string): string {
        if (!(latestApp in allApps)) {
            this.setCurrentApp(this.defaultApp);
            return this.defaultApp;
        }
        else {
            return latestApp;
        };
    };

    setAndGetLatestApp(): string {
        const latestApp = this.getLatestApp();
        this.setCurrentApp(latestApp);
        return latestApp;
    };

};

export function switchApp(app: string): void {
    const appManager = new AppManager();
    appManager.setCurrentApp(app);
};
