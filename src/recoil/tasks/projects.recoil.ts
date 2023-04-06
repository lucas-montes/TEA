import {  RecoilState, selector, SetRecoilState, GetRecoilValue } from "recoil";

import { ProjectState, Task } from "./types";

import { customSelector, customAtom, setItem, getItem } from "@/recoil/base.recoil";
import { project1, project2 } from "@/utils/constants"

export const projectsState: RecoilState<ProjectState> = customAtom(
  "projectState",
  {},
  { 51: project1, 52: project2 }
);

export const projectsSelector: RecoilState<ProjectState> = customSelector(
  "projectsSelector",
  projectsState
);

export const selectProjectSelector = customSelector(
  "selectProjectSelector",
  projectsState,
  getItem,
  setItem
)

export const tasksSelector = selector({
  key: "tasksSelector",
  get: ({ get }) => getProjectTasks(get),
  set: ({ get, set }, task) => addNewTask(task, set, get),
});

function getProjectTasks(get: GetRecoilValue): {[key:number]: Task} {
  const currentProject = get(projectsState).selectedItem;
  return currentProject ? currentProject.tasks : {};
}

function addNewTask(task: any, set: SetRecoilState, get: GetRecoilValue): void {
  const currentState = get(projectsState);
  const currentProject = currentState.selectedItem
  const currentTasks = currentProject?.tasks
  console.log(currentTasks)
  set(projectsState, { ...get(projectsState), selectedItemId: item.id, selectedItem: item })
}
