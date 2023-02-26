import React, { useState } from "react";
import Ticket from "./Ticket";


export default class KanbanContent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { change: true };
    }
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