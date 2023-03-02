import { useState, useEffect } from "react";

import ItemsManager from "../../../managers/ItemsManager";
import { useParams } from 'react-router-dom';

function scheduleItem() {
    return (<div></div>)
}

export default function ScheduleContent() {
    const val = ItemsManager.getItem(useParams());
    const [inputs, setInputs] = useState({ title: "", content: "" });
    const [allTasks, setAllTasks] = useState([]);
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
        new ProsCons().update(val.id, { title: inputs.title, content: inputs.content, cons: Cons, pros: Pros });
    };

    function addNewPro(event: any) {
        event.preventDefault();
        const updatedPros = [...Pros];
        updatedPros.push(newPros);
        setPros(updatedPros);
        setnewPros("");
        val.pros = updatedPros;
        ItemsManager.saveItem(val);
    };

    return (<div></div>)
};
