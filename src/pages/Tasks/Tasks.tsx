import React from "react";

import { Task } from "@/pages/Tasks/Task";
import { Task as TaskType } from "@/recoil/tasks/types";
import Modal from "@/components/Modals/Modal";
import TaskForm from "@/components/Modals/Forms/TaskForm";

type Props = {
    tasks: { [key: number]: TaskType }
}

const Tasks = ({ tasks }: Props) => {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>

            {
                Object.values(tasks).map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        setShowModal={setShowModal}
                    />
                ))}
            <Modal title={"Manage Tasks"} showModal={showModal} setShowModal={setShowModal} content={<TaskForm/>}/>
        </>
    );
};

export default Tasks;
