import allApps, { kanban } from "../constants/Apps";
import { SessionStorageManagerStatic } from "./SessionStorageManager";


export default class AppManager {
    static sessionStorage = SessionStorageManagerStatic;
    static defaultApp: string = kanban;
    static sessionStorageKey: string = "currentApp";

    static getLatestApp(): string {
        try {
            return this.sessionStorage.getStringValue(this.sessionStorageKey);
        }
        catch (error) {
            console.error(error);
            return this.defaultApp;
        };
    };

    static setCurrentApp(currentApp: string): void {
        this.sessionStorage.replaceStringValue(this.sessionStorageKey, currentApp);
    };

    static fixCorrectApp(latestApp: string): string {
        if (!(latestApp in allApps)) {
            this.setCurrentApp(this.defaultApp);
            return this.defaultApp;
        }
        else {
            return latestApp;
        };
    };

    static setAndGetLatestApp(): string {
        const latestApp = this.getLatestApp();
        this.setCurrentApp(latestApp);
        return latestApp;
    };

};

export function switchApp(app: string): void {
    AppManager.setCurrentApp(app);
};
