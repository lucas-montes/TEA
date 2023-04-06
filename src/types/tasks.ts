import { BaseType } from "@/types/base";

export type TaskType = BaseType & {
    projectId: ProjectType["id"];
    taskStatus: string;
}

export type ProjectType = BaseType & {
    tasks: { [key: TaskType["id"]]: TaskType; }
}

export type ProjectState = {
    items: { [key: ProjectType["id"]]: ProjectType; };
    selectedItemId: ProjectType["id"] | null;
    selectedItem: ProjectType | null;
};
