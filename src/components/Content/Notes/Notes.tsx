import React, { useState } from "react";
import Note from "./Note";

export default class NotesContent extends React.Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Note title={"titulo de la nota"} content={"contenido de la nota"} key={"1"} />
        );
    }
};