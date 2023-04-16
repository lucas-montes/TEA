import { useRecoilState } from "recoil";
import { useState } from "react";
import { tasksSelector } from "@/recoil/tasks/projects.recoil";

import { SidebarTasks } from "@/components/SidebarTasks";
import { SplitPane } from "@/components/SplitPanel";
import { FlexColumn } from "@/styles/layout";
import { Container } from "@/styles/layout";
import ProjectsTabs from "@/pages/Tasks/ProjectTabs";
import Modal from "@/components/Modals/Modal";
import TaskForm from "@/components/Modals/Forms/TaskForm";
import { TaskType } from "@/types/tasks";

import Tasks from "./Tasks";
import { ProjectInformation } from "./ProjectInfo";

const Project = () => {
    const [tasks, setTasks] = useRecoilState(tasksSelector);
    const [activeTab, setActiveTab] = useState("Tasks");
    const [showModal, setShowModal] = useState(false);
    const [workingTask, setWorkingTask] = useState({} as TaskType);
    const [modalTitle, setModalTitle] = useState("Update task");
    function currentChild(activeTab: string): JSX.Element {
        switch (activeTab) {
            case "Tasks":
                return <Tasks
                    setWorkingTask={setWorkingTask}
                    tasks={tasks}
                    setModalTitle={setModalTitle}
                    setShowModal={setShowModal} />;
            default:
                return <ProjectInformation />;
        }
    }

    return (
        <Container>
            <SplitPane split="vertical" minSize={0} maxSize={300} defaultSize={200}>
                <SidebarTasks />
                <FlexColumn className="w-min" width="100%" height="100%">
                    <ProjectsTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        setShowModal={setShowModal}
                        setModalTitle={setModalTitle}
                        setWorkingTask={setWorkingTask}
                    />
                    {currentChild(activeTab)}
                    <Modal
                        title={modalTitle}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        content={
                            <TaskForm
                                task={workingTask}
                                setTasks={setTasks}
                                setShowModal={setShowModal}
                            />
                        } />
                </FlexColumn>
            </SplitPane>
        </Container>
    );
};

export default Project;
