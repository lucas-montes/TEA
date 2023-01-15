import React, { useState } from 'react';
import SideBarIcons from '../../../constants/SideBarIcons';
import AppManager from "../../../managers/manageApp";


export default class AppsBar extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="left-0 w-1/4 bg-white dark:bg-gray-900 shadow-lg relative">
        {SideBarIcons.map((value, index) => {
          return SideBarIcon(value.icon, value.className, value.tooltipClassName, value.tooltipText, index.toString())
        })}
      </div>
    );
  }
};

function SideBarIcon(
  icon: JSX.Element,
  className: string,
  tooltipClassName: string,
  tooltipText: string,
  key: string
) {
  function loadAppData(title: string): void {
    console.log(`Hi there, ${title}`);
    const appManager = new AppManager()
    appManager.setCurrentApp(title)
    // const [app, appManager.setCurrentApp] = useState(title);
  };
  return (
    <button key={key} className={className} onClick={() => loadAppData(tooltipText)}>
      {icon}
      <span className={tooltipClassName}>
        {tooltipText}
      </span>
    </button>
  )
};
