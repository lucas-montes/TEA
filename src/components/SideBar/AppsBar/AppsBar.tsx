import { useContext } from 'react';

import AppContext from "../../../context/AppContext/AppContext";
import SideBarIcons from '../../../constants/SideBarIcons';
import MenuApp from '../../../models/Apps';


export default function AppsBar() {
  return (
    <div className="left-0 w-1/4 bg-white dark:bg-gray-900 shadow-lg relative">
      {SideBarIcons.map((value, index) => {
        return SideBarIcon(value, index.toString())
      })}
    </div>
  );
};

function SideBarIcon(MenuApp: MenuApp, key: string) {
  const { app, setApp } = useContext(AppContext);

  function onClickMethod(MenuApp: MenuApp, setAppMethod: (app: string) => void): void {
    MenuApp.onClickMethod(MenuApp);
    if (!MenuApp.isSettings) {
      console.log(MenuApp.tooltipText)
      setAppMethod(MenuApp.tooltipText);
    };
  };


  return (
    <button key={key} className={MenuApp.className} onClick={() => onClickMethod(MenuApp, setApp)}>
      {MenuApp.icon}
      <span className={MenuApp.tooltipClassName}>
        {MenuApp.tooltipText}
      </span>
    </button>
  )
};
