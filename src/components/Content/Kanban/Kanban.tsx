import { useState, useRef, useEffect, Component, ReactNode } from "react";

import ItemsManager from "../../../managers/ItemsManager";
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../../../store/manager";
import { range } from "../../../utils/general";
import Ticket from "./Ticket";


class KanbanColumn extends Component {
    constructor(props: any) {
        super(props);
    }

    datas() {
        const datas = [];
        for (let i of range(1, 12)) {
            datas.push(<Ticket />)
        }
        return datas;
    }

    render(): ReactNode {
        return (
            <div className="bg-white rounded px-2 py-2  ">

                <div className="flex flex-row justify-between items-center mb-5 mx-1 shadow-lg">
                    <div className="flex items-center">
                        <h2 className="bg-red-100 w-max px-1 rounded mr-2 text-gray-700">{this.props.title}</h2>
                        <p className="text-gray-400">3</p>
                    </div>
                    <div className="flex items-center text-gray-300">
                        <p className="mr-2 text-2xl">---</p>
                        <p className="text-2xl">+</p>
                    </div>
                </div>

                <div className=" overflow-auto h-screen justify-evenly">
                    {this.datas().map((value, index) => {
                        return value
                    })}


                    {/* <div className="p-2 rounded shadow-sm border-gray-100 border-2">
                        <h3 className="text-sm mb-3 text-gray-700">Social media</h3>
                        <p className="bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700">To-do</p>
                        <div className="flex flex-row items-center mt-2">
                            <div className="bg-gray-300 rounded-full w-4 h-4 mr-3"></div>
                            <a href="#" className="text-xs text-gray-500">Sophie Worso</a>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">2</p>
                    </div> */}


                </div>
            </div>
        )
    }
}


export default function KanbanContent() {
    const val = ItemsManager.getItem(useParams());
    const [inputs, setInputs] = useState({ title: "", content: "" });
    console.log(val)
    return (
        <div>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-3">


                <KanbanColumn title={"To-Do"} />
                <KanbanColumn title={"Doing"} />
                <KanbanColumn title={"Done"} />

            </div>
        </div>

    )
};
