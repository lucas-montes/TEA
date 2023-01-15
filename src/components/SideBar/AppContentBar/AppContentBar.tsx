import React, { useState } from 'react';
import posts from "../../../constants/testConstants";
import { BsPlus } from 'react-icons/bs';
import AppItem from "../../../models/Apps";
import AppContext from '../../../context/AppContext/AppContext';


class AppItemComponent extends React.Component {
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

export default class AppContentBar extends React.Component {
  appTitle: any;
  static contextType = AppContext;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const title = this.context
    this.appTitle = title.app;
    console.log("componentDidMount", this.context.app)
  }
  componentDidUpdate() {
    this.appTitle = this.context.app;
    console.log("componentDidUpdate", this.context.app)
  }
  componentWillUnmount() {
    this.appTitle = this.context.app;
    console.log("componentWillUnmount", this.context.app)
  }

  getItems(): Array<AppItem> {
    return []
  }

  render() {
    return (
      <div className="w-3/4 flex flex-col justify-between h-screen bg-gray-100 dark:bg-gray-800 border-r w-48">
        <div className="px-4 py-6 ">
          <h1 className=" font-bold ">

            <span className="text-2xl text-white flex items-center">
              {this.appTitle}
            </span>
          </h1>

          <nav aria-label="Main Nav" className="flex flex-col mt-6 space-y-1 overflow-auto">
            <AppItemComponent title="Añadir nuevo" url="add/new" icon={<BsPlus size="15" />} />
            {this.getItems().map((value, index) => {
              <AppItemComponent title={value.icon} url={value.url} icon={<BsPlus size="15" />} />
            })}
          </nav>
        </div>
      </div>
    );
  }
}
