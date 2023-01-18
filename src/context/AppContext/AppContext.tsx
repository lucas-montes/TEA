import React from "react";

import AppManager, { switchApp } from "../../managers/AppManager"

const appManager = new AppManager()

export default function handleInitialApp(): [string, (app: string) => void] {
    let latestApp: string = appManager.setAndGetLatestApp();
    let rightLatestApp: string = appManager.fixCorrectApp(latestApp);
    appManager.setCurrentApp(rightLatestApp);
    return React.useState(rightLatestApp);
}

let latestApp: string = appManager.setAndGetLatestApp();
let rightLatestApp: string = appManager.fixCorrectApp(latestApp);
export const AppContext = React.createContext({ app: rightLatestApp, setApp: (app: string) => { } });

// export default AppContext;