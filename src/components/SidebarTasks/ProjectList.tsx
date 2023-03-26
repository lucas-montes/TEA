import { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { categoriesSelector, openCategoryListSelector } from "@/recoil/categories.recoil";

import { LabelText } from "@/utils/enums";

import { IconButton } from "@/components/Button";
import { Plus } from "@/components/Icons";

import { SimpleForm } from "@/components/Forms/SimpleForm";
import { ProjectContext } from "./ProjectContext";
import { ProjectOption } from "./ProjectOption";
import { CollapseListButton } from "@/components/CollapseListButton";
import { ProjectTitle, List } from "./style";
import { Category } from "@/recoil/types";

import { NewProjectForm } from "./NewProjectForm"

export const ProjectList = () => {
  const [renamingCategoryId, setRenamingCategoryId] = useState("");
  const [addingTempCategory, setAddingTempCategory] = useState(false);
  const projects = useRecoilValue(categoriesSelector);
  const [categoryListOpen, setCategoryListOpen] = useRecoilState(openCategoryListSelector);

  const cancelRenaming = useCallback(() => setRenamingCategoryId(""), []);

  const caty: Category = {name: "heydfdf", id: "51"};
  return (
    <>
    <NewProjectForm/>
      <List>
        
      <ProjectContext
              key={0}
              categoryId={"0"}
              setRenamingCategoryId={setRenamingCategoryId}
            >
              <ProjectOption
                category={caty}
                renamingId={renamingCategoryId}
                cancelRenaming={cancelRenaming}
              />
            </ProjectContext>
        {
        // categoryListOpen &&
          projects.map((project) => (
            <ProjectContext
              key={project.id}
              categoryId={project.id}
              setRenamingCategoryId={setRenamingCategoryId}
            >
              <ProjectOption
                category={project}
                renamingId={renamingCategoryId}
                cancelRenaming={cancelRenaming}
              />
            </ProjectContext>
          ))}
      </List>
      {
        addingTempCategory && 
        <SimpleForm 
          recoilStateMethod={categoriesSelector}
          closeForm={() => setAddingTempCategory(false)} 
        />
      }
    </>
  );
};
