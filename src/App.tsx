import { useState } from "react";

import Content from './components/Content/Content';
import SideBar from './components/SideBar/SideBar';
import ThemeContext, { handleInitialTheme } from "./context/ThemeContext/ThemeContext";
import AppContext, { handleInitialApp } from "./context/AppContext/AppContext";

const App = () => {
  const [theme, setTheme] = handleInitialTheme();
  const [app, setApp] = handleInitialApp();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AppContext.Provider value={{ app, setApp }}>
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