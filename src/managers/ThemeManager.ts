import LocalStorageManager from "./LocalStorageManager";


export default class ThemeManager {
    localStorage: LocalStorageManager;
    darkTheme: string = "dark";
    lightTheme: string = "light";
    defaultTheme: string = "dark";
    localStorageKey: string = "theme";

    constructor() {
        this.localStorage = new LocalStorageManager();
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

    setLocalStorageTheme(newTheme: string): void {
        this.localStorage.setValue(this.localStorageKey, newTheme);
    };

    replaceStyle(newTheme: string): void {
        const bodyClass = window.document.body.classList;
        if (newTheme === this.lightTheme) bodyClass.remove(this.darkTheme);
        else bodyClass.add(this.darkTheme);
    };

    getNewTheme(): string {
        const latestTheme = this.getLatestTheme();
        if (latestTheme === this.lightTheme) return this.darkTheme;
        else return this.lightTheme;
    };

    setAndGetLatestTheme(): string {
        const latestTheme = this.getLatestTheme();
        this.fixCorrectTheme(latestTheme);
        this.replaceStyle(latestTheme);
        return latestTheme;
    }

    switchAndGetNewTheme(): string {
        const newTheme = this.getNewTheme();
        this.changeLocalStorageTheme(newTheme);
        this.replaceStyle(newTheme);
        return newTheme;
    };

    fixCorrectTheme(latestApp: string | null): string {
        if (latestApp === null) {
            this.setLocalStorageTheme(this.defaultTheme);
            return this.defaultTheme;
        }
        else {
            return latestApp;
        };
    };
};

export function switchTheme(props: any): void {
    const themeManager = new ThemeManager();
    themeManager.switchAndGetNewTheme();
};