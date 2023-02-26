import React, { useState } from "react";
import Note from "./Note";

export default class NotesContent extends React.Component {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        this.getId()
    }
    getId() {
        const id = location.pathname.split("/")[2];
        console.log(id);
    }
    render() {
        return (
            <Note title={"titulo de la nota"} content={"contenido de la nota"} key={"1"} />
        );
    }
};