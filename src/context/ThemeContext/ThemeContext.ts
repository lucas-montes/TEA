import React from "react";

import ThemeManager from "../../managers/manageTheme"

const themeManager = new ThemeManager()

// set the defaults
const ThemeContext = React.createContext({
    theme: themeManager.setAndGetLatestTheme(),
    setTheme: () => { }
});

export default ThemeContext;