import React, { useState } from 'react';
import SideBarIcons from '../../../constants/SideBarIcons';
import useCurrentApp from "../../../hooks/useCurrentApp";


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
    useCurrentApp(title)
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
