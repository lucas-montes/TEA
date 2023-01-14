import React, { useState } from "react";
import AppsBar from './AppsBar/AppsBar';
import AppContentBar from './AppContentBar/AppContentBar';
import { invoke } from "@tauri-apps/api/tauri";


export default class SideBar extends React.Component {
  constructor(props) {
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
