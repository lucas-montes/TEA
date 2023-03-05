import React from 'react';
import { Link } from "react-router-dom";

export default class AppItemComponent extends React.Component {
    title: string;
    icon: JSX.Element;
    url: string;

    constructor(
        props: any,
    ) {
        super(props);
        this.title = props.title;
        this.url = props.url;
        this.icon = props.icon;
    }

    isDropdown(): boolean { return false; }

    changeCurrentItem() {
        // get the model name and the id
        // set the item here so it can be retieved latter on
    }

    render() {
        return (
            <Link
                onClick={this.changeCurrentItem}
                className="
        flex items-center px-4 py-2 cursor-pointer rounded-lg
        text-black hover:bg-gray-900 hover:text-gray-100
        dark:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900"
                to={this.url}>
                {this.icon}
                <span className="ml-3 text-sm font-medium"> {this.title} </span>
            </Link>
        )
    }

}