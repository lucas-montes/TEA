import { RecoilState, selector, SetRecoilState, GetRecoilValue, DefaultValue } from "recoil";

import Project, {Task} from "@/models/Project";
import { customSelector, customAtom, setItem, getItem } from "@/recoil/base.recoil";
import { project1, project2 } from "@/utils/constants"

export type ProjectState = {
  items: { [key: Project["id"]]: Project; };
  selectedItemId: Project["id"];
  selectedItem: Project;
};

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

function getProjectTasks(get: GetRecoilValue): { [key: number]: Task } | Task {
  const currentProject = get(projectsState).selectedItem;
  return currentProject ? currentProject.tasks : {};
}

function addNewTask(task: { [key: number]: Task; } | DefaultValue | Task, set: SetRecoilState, get: GetRecoilValue): void {
  if (!(task instanceof DefaultValue)) {
    const currentState = structuredClone(get(projectsState));
    const currentProject = currentState.selectedItem
    // @ts-ignore
    currentProject.tasks[task.id] = task
    currentState.items[currentState.selectedItemId] = currentProject
    set(projectsState, { ...currentState })
  }
}
