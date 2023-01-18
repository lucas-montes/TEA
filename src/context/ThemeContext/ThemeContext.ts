import ThemeManager from "../../managers/ThemeManager"


export default function handleInitialTheme(): void {
    const themeManager = new ThemeManager()
    const latestTheme: string = themeManager.setAndGetLatestTheme();
    themeManager.fixCorrectTheme(latestTheme);
};