import React, { useState } from "react";
import AppsBar from './AppsBar/AppsBar';
import AppContentBar from './AppContentBar/AppContentBar';


export default class SideBar extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="h-screen flex">
        <AppsBar />
        <AppContentBar />
      </div>
    );
  }
};
