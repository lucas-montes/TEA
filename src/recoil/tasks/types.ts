
export type BaseType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
}

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
