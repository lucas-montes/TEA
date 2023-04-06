import React from "react";

import { SetterOrUpdater } from "recoil";

import { Task } from "@/pages/Tasks/Task";
import { Task as TaskType } from "@/recoil/tasks/types";
import Modal from "@/components/Modals/Modal";
import TaskForm from "@/components/Modals/Forms/TaskForm";

type Props = {
    tasks: { [key: number]: TaskType }
    setTasks: SetterOrUpdater<{
        [key: number]: TaskType;
    }>,
}

const Tasks = ({ tasks, setTasks }: Props) => {
    const [showModal, setShowModal] = React.useState(false);
    const [workingTask, setWorkingTask] = React.useState({} as TaskType);

    return (
        <>

            {
                Object.values(tasks).map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        setWorkingTask={setWorkingTask}
                        setShowModal={setShowModal}
                    />
                ))}
            <Modal
                title={"Manage Tasks"}
                showModal={showModal}
                setShowModal={setShowModal}
                content={
                    <TaskForm task={workingTask} setTasks={setTasks} setShowModal={setShowModal} />
                } />
        </>
    );
};

export default Tasks;
