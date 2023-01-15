import React from "react";

import AppManager, { switchApp } from "../../managers/AppManager"

const appManager = new AppManager()

export function handleInitialApp(): [string, (app: string) => void] {
    let latestApp: string = appManager.setAndGetLatestApp();
    let rightLatestApp: string = appManager.fixCorrectApp(latestApp);
    const [app, setApp] = React.useState(rightLatestApp);
    appManager.setCurrentApp(app);
    return [app, switchApp];
}


const AppContext = React.createContext({
    app: appManager.setAndGetLatestApp(),
    setApp: switchApp,
});

export default AppContext;