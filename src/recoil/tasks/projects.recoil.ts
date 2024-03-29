import { RecoilState, selector, SetRecoilState, GetRecoilValue, DefaultValue } from "recoil";

import Project, { Task } from "@/models/Project";
import { customSelector, customAtom, setItem, getItem, getItems } from "@/recoil/base.recoil";

export type ProjectState = {
    items: { [key: Project["id"]]: Project; };
    selectedItemId: Project["id"];
    selectedItem: Project;
    hasDatabaseInfo: boolean
};

export const projectsState: RecoilState<ProjectState> = customAtom(
    "projectState",
    {},
);

export const projectsDatabase: RecoilState<ProjectState> = customSelector(
    "projectsDatabase",
    projectsState,
    isUpdatedFromDatabase,
    updateFromDatabase,
);

function isUpdatedFromDatabase<ProjectState>(
    get: GetRecoilValue,
    state: RecoilState<ProjectState>
): boolean {
    return get(state).hasDatabaseInfo;
}

function updateFromDatabase(
    projects: Project[],
    set: SetRecoilState,
    get: GetRecoilValue,
    state: RecoilState<ProjectState>): void {
    const currentState = structuredClone(get(state));
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        currentState.items[project.id] = project;
    }
    currentState.hasDatabaseInfo = true;
    set(state, { ...currentState });
}

export const projectsSelector: RecoilState<ProjectState> = customSelector(
    "projectsSelector",
    projectsState,
    getItems,
    addProject,
);

function addProject(
    project: Project,
    set: SetRecoilState,
    get: GetRecoilValue,
    state: RecoilState<Project>): void {
    const currentState = structuredClone(get(state));
    currentState.items[project.id] = project;
    currentState.selectedItem = project;
    currentState.selectedItemId = project.id;
    set(state, { ...currentState });
}

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
        currentProject.tasks[task.id] = task
        currentState.items[currentState.selectedItemId] = currentProject
        set(projectsState, { ...currentState })
    }
}
