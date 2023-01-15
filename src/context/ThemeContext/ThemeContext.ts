import React from "react";

import ThemeManager from "../../managers/ThemeManager"

const themeManager = new ThemeManager()

export function handleInitialTheme(): [string, () => string] {
    const latestTheme: string = themeManager.setAndGetLatestTheme();
    themeManager.fixCorrectTheme(latestTheme);
    const [theme, _] = React.useState(latestTheme);
    const setTheme = themeManager.switchAndGetNewTheme;
    return [theme, setTheme];
}


const ThemeContext = React.createContext({
    theme: themeManager.setAndGetLatestTheme(),
    setTheme: () => { }
});

export default ThemeContext;