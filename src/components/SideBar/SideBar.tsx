import React, { useState } from "react";
import AppsBar from './AppsBar/AppsBar';
import AppContentBar from './AppContentBar/AppContentBar';


export default function SideBar({ app, setApp }) {

  return (
    <div className="h-screen flex">
      <AppsBar app={app} setApp={setApp} />
      <AppContentBar app={app} />
    </div>
  );

};
