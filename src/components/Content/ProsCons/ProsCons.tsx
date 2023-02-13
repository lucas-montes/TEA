import React, { useState } from "react";
import { ProsCons as ProsConsModel } from "../../../models/ProsCons";

export default class ProsCons extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            notes: [],
        }
    }

    getNotesFirstTime(): void {
        Note.getAll()
            .then((files) => { this.setState({ notes: files }); })
            .catch((error) => {
                console.error(error);
            })
    }

    componentDidMount() {
        this.getNotesFirstTime()
    }

    render() {
        return (
            <div>

            </div>
        );
    }
};