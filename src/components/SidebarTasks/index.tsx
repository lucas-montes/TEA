import { FlexColumn } from "@/styles/layout";

import { ProjectList } from "./ProjectList";
import { Header, StyledSidebar } from "../Sidebar/style";

export const SidebarTasks = () => {

  return (
    <>

        <StyledSidebar>
          <FlexColumn height="100%">
            <Header>
              Tasks
            </Header>
            <ProjectList />
          </FlexColumn>
        </StyledSidebar>

    </>
  );
};
