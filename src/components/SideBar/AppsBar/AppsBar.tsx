import SideBarIcons from '../../../constants/SideBarIcons';
import MenuApp from '../../../models/Apps';

import { useDispatch, useSelector } from "react-redux";
import {changeCurrentApp} from "../../../store/manager";


export default function AppsBar() {
  return (
    <div className="left-0 w-1/4 bg-white dark:bg-gray-900 shadow-lg relative">
      {SideBarIcons.map((value, index) => {
        return SideBarIcon(value, index.toString())
      })}
    </div>
  );
};

function SideBarIcon(MenuApp: MenuApp, key: String) {
  const dispatch = useDispatch();
  
  function handleSetApp( MenuApp: MenuApp) {
    MenuApp.onClickMethod(MenuApp.tooltipText);
    dispatch(changeCurrentApp(MenuApp.tooltipText));
  };

  if (MenuApp.isSettings) {
    return (
      <button key={key} className={MenuApp.className} onClick={() => MenuApp.onClickMethod(MenuApp.tooltipText)}>
        {MenuApp.icon}
        <span className={MenuApp.tooltipClassName}>
          {MenuApp.tooltipText}
        </span>
      </button>
    )
  }

  return (
    <button key={key} className={MenuApp.className} onClick={() => handleSetApp(MenuApp)}>
      {MenuApp.icon}
      <span className={MenuApp.tooltipClassName}>
        {MenuApp.tooltipText}
      </span>
    </button>
  )
};
