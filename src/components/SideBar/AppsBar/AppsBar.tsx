import SideBarIcons from '../../../constants/SideBarIcons';
import MenuApp from '../../../models/Apps';


export default function AppsBar({ app, setApp }) {
  return (
    <div className="left-0 w-1/4 bg-white dark:bg-gray-900 shadow-lg relative">
      {SideBarIcons.map((value, index) => {
        return SideBarIcon(value, setApp, index.toString())
      })}
    </div>
  );
};

function SideBarIcon(MenuApp: MenuApp, setApp: any, key: String) {
  function handleSetApp(setApp: any, MenuApp: MenuApp) {
    MenuApp.onClickMethod(MenuApp.tooltipText);
    setApp(MenuApp.tooltipText);
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
    <button key={key} className={MenuApp.className} onClick={() => handleSetApp(setApp, MenuApp)}>
      {MenuApp.icon}
      <span className={MenuApp.tooltipClassName}>
        {MenuApp.tooltipText}
      </span>
    </button>
  )
};
