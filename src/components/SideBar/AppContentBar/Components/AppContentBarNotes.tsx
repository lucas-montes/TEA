import AppItemComponent from "./AppItemComponent";
import { BsPlus, BsAlarm } from 'react-icons/bs';
import Note from "../../../../models/Note";
import React from 'react';

export default class AppContentBarNotes extends React.Component {
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
                {this.state.notes.map((value, index) => {
                    return <AppItemComponent title={value.fileName} url={value.fullPath} icon={<BsAlarm size="15" />} key={index} />
                })}
            </div>
        );
    }
}