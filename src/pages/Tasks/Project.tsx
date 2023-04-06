import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { tasksSelector } from "@/recoil/tasks/projects.recoil";

import { SidebarTasks } from "@/components/SidebarTasks";
import { SplitPane } from "@/components/SplitPanel";
import { FlexColumn } from "@/styles/layout";
import { Container } from "@/styles/layout";
import ProjectsTabs from "@/pages/Tasks/ProjectTabs";

import Tasks from "./Tasks";
import { ProjectInformation } from "./ProjectInfo";

const Project = () => {
    const [tasks, setTasks] = useRecoilState(tasksSelector);
    const [activeTab, setActiveTab] = useState("Tasks");

    function currentChild(activeTab: string): JSX.Element {
        var currentChild: JSX.Element;
        switch (activeTab) {
            case "Tasks":
                currentChild = <Tasks tasks={tasks} setTasks={setTasks}/>
                break;
            case "Settings":
                currentChild = <ProjectInformation />
                break;
            case "Profile":
                currentChild = <ProjectInformation />
                break;
            default:
                currentChild = <ProjectInformation />
                break;
        }
        return currentChild;
    }

    return (
        <Container>
            <SplitPane split="vertical" minSize={0} maxSize={300} defaultSize={200}>
                <SidebarTasks />
                <FlexColumn className="w-min" width="100%" height="100%">
                    <ProjectsTabs activeTab={activeTab} onClick={setActiveTab} />
                    {currentChild(activeTab)}
                </FlexColumn>
            </SplitPane>
        </Container>
    );
};

export default Project;
