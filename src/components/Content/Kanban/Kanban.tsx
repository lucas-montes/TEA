import React, { useState } from "react";
import Ticket from "./Ticket";
// When using the Tauri API npm package:
import { invoke } from '@tauri-apps/api/tauri'
// When using the Tauri global script (if not using the npm package)
// Be sure to set `build.withGlobalTauri` in `tauri.conf.json` to true
const invoke = window.__TAURI__.invoke

export default class Kanban extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { change: true };
    }
    // invoke('my_custom_command', { invokeMessage: 'message from front!' }).then((message) => console.log(message));
    render() {
        return (
            <div className="h-screen bg-gray container mx-auto pt-4 px-7 overflow-auto">
                {ar.map((value, index) => {
                    return Ticket(value.title, value.content, index.toString())
                })}
            </div>
        );
    }
};