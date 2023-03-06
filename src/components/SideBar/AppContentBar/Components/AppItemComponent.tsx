import React from 'react';
import { Link } from "react-router-dom";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

//https://github.com/abhijithvijayan/react-minimal-side-navigation
export default class AppItemComponent extends React.Component {
    value: any;
    title: string;
    icon: JSX.Element;
    url: string;

    constructor(props: any) {
        super(props);
        this.value = props.value;
        this.title = props.title;
        this.url = props.url;
        this.icon = props.icon;
    }

    isDropdown(): boolean { return false; }

    changeCurrentItem() {
        // get the model name and the id
        // set the item here so it can be retieved latter on
        console.log(window.location)
    }

    render() {
        return (
            <Link
                onClick={this.changeCurrentItem}
                className="sidebar-entry"
                to={this.url}>
                {this.icon}
                <span className="ml-3 text-sm font-medium"> {this.title} </span>
            </Link>
        )
    }

}
