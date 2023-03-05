import React from "react";

import AppManager, { switchApp } from "../../managers/AppManager"

export default function handleInitialApp(): [string, (app: string) => void] {
    let latestApp: string = AppManager.setAndGetLatestApp();
    let rightLatestApp: string = AppManager.fixCorrectApp(latestApp);
    AppManager.setCurrentApp(rightLatestApp);
    return React.useState(rightLatestApp);
}

let latestApp: string = AppManager.setAndGetLatestApp();
let rightLatestApp: string = AppManager.fixCorrectApp(latestApp);
export const AppContext = React.createContext({ app: rightLatestApp, setApp: (app: string) => { } });

// export default AppContext;