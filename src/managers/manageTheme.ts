import LocalStorage from "./manageLocalStorage";


export default class ThemeManager {
    localStorage: LocalStorage;
    defaultTheme: string = "dark";
    localStorageKey: string = "theme";

    constructor() {
        this.localStorage = new LocalStorage();
    }

    getLatestTheme(): string {
        try {
            return this.localStorage.getValue(this.localStorageKey);
        }
        catch (error) {
            console.log(error);
            return this.defaultTheme;
        };
    }

    changeTheme(newTheme: string): void {
        this.localStorage.replaceValue(this.localStorageKey, newTheme)
    }
}
