import React from "react";

import { TaskComponent } from "@/pages/Tasks/Task";
import { Task } from "@/models/Project";

type Props = {
    tasks: { [key: number]: Task }
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setWorkingTask: React.Dispatch<React.SetStateAction<Task>>,
    setModalTitle: React.Dispatch<React.SetStateAction<string>>
}

const Tasks = ({ tasks, setShowModal, setWorkingTask, setModalTitle }: Props) => {
    return (
        <div className="container overflow-auto">
            {
                Object.values(tasks).map((task) => (
                    <TaskComponent
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
