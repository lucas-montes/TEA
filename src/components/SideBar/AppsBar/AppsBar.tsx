import { useContext } from 'react';

import ThemeContext from "../../../context/ThemeContext/ThemeContext";
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

function SideBarIcon(
  MenuApp: MenuApp,
  key: string
) {

  // const { theme, _ } = useContext(ThemeContext);

  return (
    <button key={key} className={MenuApp.className} onClick={() => MenuApp.onClickMethod()}>
      {MenuApp.icon}
      <span className={MenuApp.tooltipClassName}>
        {MenuApp.tooltipText}
      </span>
    </button>
  )
};
