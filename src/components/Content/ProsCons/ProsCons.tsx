import React, { useState } from "react";
import ProsCons from "../../../models/ProsCons";

export default class ProsConsContent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            notes: [],
        }
    }

    getNotesFirstTime(): void {
        new ProsCons().getAll()
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
                eeeee
            </div>
        );
    }
};