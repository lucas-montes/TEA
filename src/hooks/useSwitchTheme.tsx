import { useEffect, useState } from 'react';

import ThemeManager from "../managers/manageTheme";


const useSwitchTheme = () => {
  const themeManager = new ThemeManager()
  const latestTheme: string = themeManager.getLatestTheme()

  useEffect(() => {
    themeManager.switchAndGetNewTheme()
  }, [latestTheme, themeManager.switchAndGetNewTheme]);

  return [latestTheme, themeManager.switchAndGetNewTheme];
};

export default useSwitchTheme;
