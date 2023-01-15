import { createContext, useState } from 'react'

import Content from './components/Content/Content';
import SideBar from './components/SideBar/SideBar';
import ThemeContext from "./context/ThemeContext/ThemeContext";
import ThemeManager from "./managers/manageTheme";
import AppManager from "./managers/manageApp";


export const AppContext = createContext("dark");

const App = () => {
  const themeManager = new ThemeManager()
  const latestTheme: string = themeManager.setAndGetLatestTheme()
  const [theme, _] = useState(latestTheme);
  const setTheme = themeManager.switchAndGetNewTheme;
  const value = { theme, setTheme };

  const appManager = new AppManager()
  const latestApp: string = appManager.getLatestApp()
  return (
    <ThemeContext.Provider value={value}>
      <AppContext.Provider value={latestApp}>
        <div className="flex-initial w-64">
          <SideBar />
        </div>
        <div className="flex-auto">
          <Content />
        </div>
      </AppContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App;