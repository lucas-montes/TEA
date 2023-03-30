import { useRecoilState, useRecoilValue } from "recoil";
import { tasksSelector } from "@/recoil/tasks/projects.recoil";

import { SidebarTasks } from "@/components/SidebarTasks";
import { SplitPane } from "@/components/SplitPanel";
import { FlexColumn } from "@/styles/layout";
import { Container } from "@/styles/layout";
import {Task} from "@/pages/Tasks/Task";

const Tasks = () => {
    const tasks = useRecoilValue(tasksSelector);
    return (
        <Container>
            <SplitPane split="vertical" minSize={0} maxSize={300} defaultSize={200}>
            <SidebarTasks />
            <FlexColumn className="w-min" width="100%" height="100%">
            {
          tasks.map((task) => (
                <Task
                    key={task.id}
                    content={task.content} 
                    status={task.taskStatus}
                />
          ))}
                
            </FlexColumn>
            </SplitPane>
        </Container>
    );
};

export default Tasks;