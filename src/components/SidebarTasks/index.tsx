import { FlexColumn } from "@/styles/layout";

import { ProjectList } from "./ProjectList";
import { Header, StyledSidebar } from "../Sidebar/style";

import { BaseSidebar } from "../BaseSidebar";

export const SidebarTasks = () => {

  return (
        <BaseSidebar title={"Tasks"}>
            <ProjectList />
        </BaseSidebar>
  );
};
