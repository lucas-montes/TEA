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
    const tasks = useRecoilValue(tasksSelector);
    const [activeTab, setActiveTab] = useState("Tasks");

    function currectChild(activeTab: string): JSX.Element {
        var currectChild: JSX.Element;
        switch (activeTab) {
            case "Tasks":
                currectChild = <Tasks tasks={tasks} />
                break;
            case "Settings":
                currectChild = <ProjectInformation />
                break;
            case "Profile":
                currectChild = <ProjectInformation />
                break;
            default:
                currectChild = <ProjectInformation />
                break;
        }
        return currectChild;
    }

    return (
        <Container>
            <SplitPane split="vertical" minSize={0} maxSize={300} defaultSize={200}>
                <SidebarTasks />
                <FlexColumn className="w-min" width="100%" height="100%">
                    <ProjectsTabs activeTab={activeTab} onClick={setActiveTab} />
                    {currectChild(activeTab)}
                </FlexColumn>
            </SplitPane>
        </Container>
    );
};

export default Project;