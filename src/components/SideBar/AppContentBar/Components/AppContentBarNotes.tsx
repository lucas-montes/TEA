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
        new Note().getAll()
            .then((files) => { console.log(files), this.setState({ notes: files }); })
            .catch((error) => {
                console.error(error);
            })
    }

    componentDidMount() {
        // this.getNotesFirstTime()
    }

    render() {
        return (
            <div>
                {this.state.notes.map((value, index) => {
                    return <AppItemComponent title={value.title} url={value.title} icon={<BsAlarm size="15" />} key={index} />
                })}
            </div>
        );
    }
}