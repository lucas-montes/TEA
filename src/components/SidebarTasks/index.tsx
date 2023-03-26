import { useMemo } from "react";
import { useRecoilValue } from "recoil";

import { sectionsSelector } from "@/recoil/sections.recoil";

import { Section } from "@/utils/enums";
import { useWindowDimensions } from "@/utils/hooks/useWindowDimensions";

import { FlexColumn } from "@/styles/layout";

import { ProjectList } from "./ProjectList";
import { Header, StyledSidebar } from "../Sidebar/style";

export const SidebarTasks = () => {
  const { isSmallDevice } = useWindowDimensions();
  const section = useRecoilValue(sectionsSelector);
  const inView = useMemo(() => section === Section.MENU, [section]);


  return (
    <>
      {(inView || !isSmallDevice) && (
        <StyledSidebar>
          <FlexColumn height="100%">
            <Header>
              Tasks
            </Header>
            <ProjectList />
          </FlexColumn>
        </StyledSidebar>
      )}
    </>
  );
};
