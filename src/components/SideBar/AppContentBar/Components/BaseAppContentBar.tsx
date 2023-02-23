import AppItemComponent from "./AppItemComponent";
import { BsPlus, BsAlarm } from 'react-icons/bs';
import React from 'react';

export default class BaseAppContentBar extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            entries: [],
        }
    }

    getModel() { return; }

    getFirstTimeEntries(): void {
        this.getModel().getAll()
            .then((allEntries) => { console.log(allEntries), this.setState({ entries: allEntries }); })
            .catch((error) => {
                console.error(error);
            })
    }

    componentDidMount() {
        this.getFirstTimeEntries()
    }

    render() {
        return (
            <div>
                {this.state.entries.map((value, index) => {
                    return <AppItemComponent title={value.title} url={value.title} icon={<BsAlarm size="15" />} key={index} />
                })}
            </div>
        );
    }
}