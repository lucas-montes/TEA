
import { ProjectList } from "./ProjectList";

import { BaseSidebar } from "../BaseSidebar";

export const SidebarTasks = () => {

    return (
        <BaseSidebar title={"Tasks"}>
            <ProjectList />
        </BaseSidebar>
    );
};
