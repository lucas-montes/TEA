import { useState } from "react";
import Channelbar from './components/ChannelBar/Channelbar';
import ContentContainer from './components/ContentContainer/ContentContainer';
import SideBar from './components/SideBar/SideBar';
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="flex">
      <SideBar />
      <Channelbar />
      <ContentContainer />
    </div>
  );
}

export default App;
