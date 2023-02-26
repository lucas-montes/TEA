import allApps, { kanban } from "../constants/Apps";
import SessionStorageManager from "./SessionStorageManager";


export default class AppManager {
    sessionStorage: SessionStorageManager;
    defaultApp: string = kanban;
    sessionStorageKey: string = "currentApp";

    constructor() {
        this.sessionStorage = new SessionStorageManager();
    };

    getLatestApp(): string {
        try {
            return this.sessionStorage.getValue(this.sessionStorageKey);
        }
        catch (error) {
            console.log(error);
            return this.defaultApp;
        };
    };

    setCurrentApp(currentApp: string): void {
        this.sessionStorage.replaceValue(this.sessionStorageKey, currentApp);
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
