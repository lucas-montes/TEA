import React from "react";

import { Task } from "@/pages/Tasks/Task";
import { Task as TaskType } from "@/recoil/tasks/types";

type Props = {
    tasks: { [key: number]: TaskType }
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setWorkingTask: React.Dispatch<React.SetStateAction<TaskType>>,
    setModalTitle: React.Dispatch<React.SetStateAction<string>>
}

const Tasks = ({ tasks, setShowModal, setWorkingTask, setModalTitle }: Props) => {
    return (
        <div className="container overflow-auto">
            {
                Object.values(tasks).map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        setWorkingTask={setWorkingTask}
                        setShowModal={setShowModal}
                        setModalTitle={setModalTitle}
                    />
                ))}
        </div>
    );
};

export default Tasks;
