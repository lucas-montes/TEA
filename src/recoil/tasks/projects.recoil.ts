import { DefaultValue, RecoilState, selector, SetRecoilState, GetRecoilValue } from "recoil";

import { ProjectState } from "./types";

import { customSelector, customAtom, setItem, getItem } from "@/recoil/base.recoil";
import { project1, project2 } from "@/utils/constants"
import Project, { Task } from "@/models/Project";

export const projectsState: RecoilState<ProjectState> = customAtom(
  "projectState",
  {},
  { 51: project1, 52: project2 }
);

export const projectsSelector: RecoilState<ProjectState> = customSelector("projectsSelector", projectsState);

export const selectProjectSelector = customSelector(
  "selectProjectSelector",
  projectsState,
  getItem,
  setItem
)

export const tasksSelector = selector({
  key: "tasksSelector",
  get: ({ get }) => getProjectTasks(get),
  set: ({ get, set }, tasks) => addNewTask(tasks, set, get),
});

function getProjectTasks(get: GetRecoilValue): Array<Task> {
  const currentProject = get(projectsState).selectedItem;
  const project = new Project(...Object.values(currentProject))
  console.log(project)
  return currentProject ? project.getTasks() : [];
}

function addNewTask(tasks: any, set: SetRecoilState, get: GetRecoilValue): void {
  !(tasks instanceof DefaultValue) && set(projectsState, { ...get(projectsState), tasks, })
}