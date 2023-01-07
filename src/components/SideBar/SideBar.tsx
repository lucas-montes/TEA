import { useState } from "react";
import AppsBar from '../AppsBar/AppsBar';
import AppContentBar from '../AppContentBar/AppContentBar';
import { invoke } from "@tauri-apps/api/tauri";


function SideBar() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="h-screen flex">
    <AppsBar />
    <AppContentBar />
  </div>
  );
}

export default SideBar;
