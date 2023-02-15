import AppItemComponent from "./AppItemComponent";
import { BsPlus, BsAlarm } from 'react-icons/bs';
import React from 'react';
import Alias from "../../../../models/Alias";


export default class AppContentBarAlias extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            aliasFiles: [],
        }
    }

    getAliasFirstTime(): void {
        Alias.getAll()
            .then((files) => { this.setState({ aliasFiles: files }); })
            .catch((error) => {
                console.error(error);
            })
    }

    componentDidMount() {
        this.getAliasFirstTime()
    }

    render() {
        return (
            <div>
                {this.state.aliasFiles.map((value, index) => {
                    return <AppItemComponent title={value.fileName} url={value.fullPath} icon={<BsAlarm size="15" />} key={index} />
                })}
            </div>
        );
    }
}
