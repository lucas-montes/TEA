import { DefaultValue, RecoilState, atom, selector, SetRecoilState, GetRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Folder } from "@/utils/enums";

import { activeFolderSelector } from "../folder.recoil";
import { ProjectState, Task } from "./types";

const { persistAtom } = recoilPersist();



const task1 = {
  id: "1",
  content: "task1",
  createdAt: "12-05-1997",
  updatedAt: "12-05-1997",
  projectId: "51",
  taskStatus: "todo",
};
const task2 = {
  id: "2",
  content: "task2",
  createdAt: "12-05-1997",
  updatedAt: "12-05-1997",
  projectId: "51",
  taskStatus: "done",
};
const task3 = {
  id: "3",
  content: "task3",
  createdAt: "12-05-1997",
  updatedAt: "12-05-1997",
  projectId: "51",
  taskStatus: "doing",
};
const task4 = {
  id: "4",
  content: "task4",
  createdAt: "12-05-1997",
  updatedAt: "12-05-1997",
  projectId: "52",
  taskStatus: "doing",
};
const task5 = {
  id: "5",
  content: "task5",
  createdAt: "12-05-1997",
  updatedAt: "12-05-1997",
  projectId: "52",
  taskStatus: "done",
};
const project1 = {
  name: "heydfdf", 
  id: "51",
  tasks: {
    "1": task1,
    "2": task2,
    "3": task3,
  },
};
const project2 = {name: "sdf68ds4f", id: "52", tasks: {
  "4": task4,
  "5": task5,
},};


export const projectState: RecoilState<ProjectState> = atom({
  key: "projectState",
  default: {
    projects: {
      "51": project1, 
      "52": project2,
    },
    selectedProjectId: "",
    projectListOpen: true,
  },
  effects_UNSTABLE: [persistAtom],
});

function addNewProject(projects:any, set: SetRecoilState, get: GetRecoilValue):void {
  !(projects instanceof DefaultValue) && set(projectState, {...get(projectState), projects,})
}

export const projectsSelector = selector({
  key: "projectsSelector",
  get: ({ get }) => Object.values(get(projectState).projects),
  set: ({ get, set }, projects) => addNewProject(projects, set, get),    
});

function setProjectId(projectId:any, set: SetRecoilState, get: GetRecoilValue): void {
  set(projectState, {...get(projectState), selectedProjectId: projectId,})
}

export const selectedProjectIdSelector = selector({
  key: "selectedProjectIdSelector",
  get: ({ get }) => get(projectState).selectedProjectId,
  set: ({ set, get }, projectId) => setProjectId(projectId, set, get),
});

function getProjectTasks(get: GetRecoilValue):Array<Task>{
  const currentProjectStat = get(projectState);
  const currenselectedProjectId = currentProjectStat.selectedProjectId;
  if (currenselectedProjectId){
    const tasks = currentProjectStat.projects[currenselectedProjectId]["tasks"];
    return Object.values(tasks);
  }
  return [];
}

export const tasksSelector = selector({
  key: "tasksSelector",
  get: ({ get }) => getProjectTasks(get),
  set: ({ get, set }, projects) => addNewProject(projects, set, get),    
});

export const selectedProjectSelector = selector({
  key: "selected-project-selector",
  get: ({ get }) => {
    const state = get(projectState);
    return state.projects.find((project) => project.id === state.selectedProjectId);
  },
  set: ({ set, get }, Project) => {
    if (Project instanceof DefaultValue || !Project) return;
    const state = get(projectState);
    set(projectState, {
      ...state,
      projects: state.projects.map((cat) => (cat.id === Project.id ? Project : cat)),
    });
  },
});

export const openProjectListSelector = selector({
  key: "open-project-list-selector",
  get: ({ get }) => get(projectState).projectListOpen,
  set: ({ get, set }, status) =>
    !(status instanceof DefaultValue) &&
    set(projectState, {
      ...get(projectState),
      projectListOpen: status,
    }),
});
