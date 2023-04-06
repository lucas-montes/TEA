import { BaseType } from "@/types/base";

export type Task = BaseType & {
    projectId: Project["id"];
    taskStatus: string;
}

export type Project = BaseType & {
    tasks: { [key: Task["id"]]: Task; }
}

export type ProjectState = {
    items: { [key: Project["id"]]: Project; };
    selectedItemId: Project["id"] | null;
    selectedItem: Project | null;
};
