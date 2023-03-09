import React, { useState, useEffect } from "react";

import ItemsManager from "../../../managers/ItemsManager";
import { useParams } from 'react-router-dom';

function* range(start: number, stop: number, step = 1) {
    if (stop == null) {
        // one param defined
        stop = start;
        start = 0;
    }

    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        yield i;
    }
}

class TimePicker extends React.Component {
    constructor(props: any) {
        super(props);
        this.updateAMPM = this.updateAMPM.bind(this);
        this.updateHour = this.updateHour.bind(this);
        this.updateMinute = this.updateMinute.bind(this);
        this.state = {
            value: "",
            hour: "",
            minute: "",
            ampm: "",
        };
    }

    componentDidMount() {
        if (this.state.value !== "") { }
    }

    createOption(num: number) {
        return (
            <option value={num.toString()}>{num}</option>
        )
    }
    generateOptions(stop: number) {
        const options = [];
        for (let i of range(1, stop)) {
            options.push(this.createOption(i));
        }
        return options;
    }

    uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    updateAMPM = (event: any) => {
        this.setState({ ampm: event.target.value });
        this.updateValue(undefined, undefined, event.target.value);
    }

    updateHour = (event: any) => {
        this.setState({ hour: event.target.value });
        this.updateValue(event.target.value, undefined, undefined);
    }

    updateMinute = (event: any) => {
        this.setState({ minute: event.target.value });
        this.updateValue(undefined, event.target.value, undefined);
    }

    updateValue(hours?: String, minutes?: String, temp?: String) {
        const hour = hours ? hours : this.state.hour;
        const minute = minutes ? minutes : this.state.minute;
        const ampm = temp ? temp : this.state.ampm;
        const value = `${hour}:${minute}${ampm}`;
        this.setState({ value: value });
    }

    render() {
        return (
            <div className={`flex justify-center ${this.props.className}`}>
                <div className="mt-2 p-5 w-40 bg-white rounded-lg shadow-xl">
                    <div className="flex">
                        <select
                            onChange={this.updateHour}
                            name="hours"
                            className="bg-transparent text-xl appearance-none outline-none"
                        >
                            {this.generateOptions(13)}
                        </select>
                        <span className="text-xl mr-3">:</span>
                        <select
                            onChange={this.updateMinute}
                            name="minutes"
                            className="bg-transparent text-xl appearance-none outline-none mr-4"
                        >
                            {this.generateOptions(60)}
                        </select>
                        <select
                            onChange={this.updateAMPM}
                            name="ampm"
                            className="bg-transparent text-xl appearance-none outline-none"
                        >
                            <option value="am">AM</option>
                            <option value="pm">PM</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}
function scheduleItem(value: any, key: String, inputs: any, handleChange: any) {
    const scheduleItemKey = `${value.id}-${key}`;
    return (
        <div key={scheduleItemKey} className="card-styled group">
            <input
                type="text"
                id="title"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                className="input-styled" />
            <textarea
                id="content"
                name="content"
                value={inputs.content}
                onChange={handleChange}
                className="textfield-styled"
                placeholder="Write your thoughts here..."></textarea>

            <div className="flex items-stretch mt-2 left-0">
                <TimePicker key={`${scheduleItemKey}-s`} value={inputs.start} />
                <TimePicker key={`${scheduleItemKey}-e`} className={"absolute right-0 mr-5"} value={inputs.end} />
            </div>
        </div>
    )
}

export default function ScheduleContent() {
    const val = ItemsManager.getItem(useParams());
    const [inputs, setInputs] = useState({ title: "", content: "" });
    const [allTasks, setAllTasks] = useState([]);
    const [taskInputs, setTaskInputs] = useState([{ id: 0, title: "", content: "", start: "", end: "" }]);
    const [newTask, setNewTask] = useState({ title: "", content: "", start: "", end: "" });


    useEffect(() => {
        if (inputs.title !== val.title) {
            setInputs({ title: val.title, content: val.content });
            setAllTasks(val.tasks);
        }
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        val.title = inputs.title
        val.content = inputs.content
        ItemsManager.saveItem(val);
        ItemsManager.updateItems(val);
        // new ProsCons().update(val.id, { title: inputs.title, content: inputs.content, cons: Cons, pros: Pros });
    };

    function addNewPro(event: any) {
        event.preventDefault();
        // const updatedPros = [...Pros];
        // updatedPros.push(newPros);
        // setPros(updatedPros);
        // setnewPros("");
        // val.pros = updatedPros;
        ItemsManager.saveItem(val);
    }

    function handleChange(event: any) {
        const name = event.target.name;
        const value = event.target.value;
        console.log(taskInputs)
        // val.title = value;
        // ItemsManager.saveItem(val);
        setTaskInputs(values => ({ ...values, [name]: value }));
    };

    return (
        <form>
            {
                allTasks.map((value: any, index: number) => {
                    return scheduleItem(value, index.toString(), taskInputs, handleChange)
                })
            }
            <button
                className="save-button absolute right-5"
                type="submit">
                Save Changes
            </button>
        </form>
    )
};
