import LocalStorage from "./manageLocalStorage";


export default class ThemeManager {
    localStorage: LocalStorage;
    darkTheme: string = "dark";
    lightTheme: string = "light";
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
    };

    changeLocalStorageTheme(newTheme: string): void {
        this.localStorage.replaceValue(this.localStorageKey, newTheme);
    };

    replaceStyle(newTheme: string): void {
        const bodyClass = window.document.body.classList;
        if (newTheme === this.lightTheme) bodyClass.remove(this.darkTheme);
        else bodyClass.add(this.darkTheme);
    };

    getNewTheme(): string {
        const latestTheme = this.getLatestTheme();
        console.log(latestTheme);
        if (latestTheme === this.lightTheme) return this.darkTheme;
        else return this.lightTheme;
    };

    setAndGetLatestTheme(): string {
        const latestTheme = this.getLatestTheme();
        this.replaceStyle(latestTheme);
        return latestTheme;
    }

    switchAndGetNewTheme(): string {
        const newTheme = this.getNewTheme();
        this.changeLocalStorageTheme(newTheme);
        this.replaceStyle(newTheme);
        return newTheme;
    };
};
