import React, { useState } from 'react';
import posts from "../../../constants/testConstants";
import { BsPlus } from 'react-icons/bs';
import AppItem from "../../../models/Apps";

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
        className="flex items-center px-4 py-2 cursor-pointer text-white hover:bg-gray-100 hover:text-gray-700 rounded-lg"
      >
        {this.icon}
        <span className="ml-3 text-sm font-medium"> {this.title} </span>
      </a>
    )
  }

}

export default class AppContentBar extends React.Component {
  appTitle: any;

  constructor(props: any) {
    super(props);
  }

  getTitle() {
    const [title, setTitle] = useState("default title");
    this.appTitle = title;
  }

  getItems(): Array<AppItem> {
    return []
  }

  render() {
    return (
      <div className="w-3/4 flex flex-col justify-between h-screen bg-black border-r w-48">
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
