import { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";


import { SidebarOption } from "@/components/SidebarOption/SidebarOption";
import { ItemContext } from "@/components/SidebarItemContext/ItemContext";
import { List } from "./style";

import { projectsSelector, openProjectListSelector, selectedProjectIdSelector } from "@/recoil/tasks/projects.recoil";
import { NewProjectForm } from "./NewProjectForm"

export const ProjectList = () => {
  const [renamingProjectId, setRenamingProjectId] = useState("");
  const projects = useRecoilValue(projectsSelector);
  const [projectListOpen, setProjectListOpen] = useRecoilState(openProjectListSelector);

  const cancelRenaming = useCallback(() => setRenamingProjectId(""), []);

  
  return (
    <>
    <NewProjectForm recoilStateMethod={projectsSelector}/>
      <List>
        {
          projects.map((project) => (
            <ItemContext
              key={project.id}
              itemId={project.id}
              itemSelector={projectsSelector}
              setRenamingItemId={setRenamingProjectId}
            >
              <SidebarOption
                item={project}
                itemSelector={projectsSelector}
                selectedItemIdSelector={selectedProjectIdSelector}
                renamingId={renamingProjectId}
                cancelRenaming={cancelRenaming}
              />
            </ItemContext>
          ))}
      </List>
    </>
  );
};
