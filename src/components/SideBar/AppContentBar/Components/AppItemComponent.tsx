import React, { useContext, useState } from 'react';

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

    render() {
        return (
            <a
                href={this.url}
                className="
        flex items-center px-4 py-2 cursor-pointer rounded-lg
        text-black hover:bg-gray-900 hover:text-gray-100
        dark:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900"
            >
                {this.icon}
                <span className="ml-3 text-sm font-medium"> {this.title} </span>
            </a>
        )
    }

}