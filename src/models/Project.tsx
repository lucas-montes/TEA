import { BaseText } from "./BaseModel";

type TauriResponse = {
    project: Project,
    tasks: Array<Task>,
}

export default class Project extends BaseText {
    tasks?: { [key: Task["id"]]: Task; };

    constructor(
        title: string,
        content = "",
        tasks?: { [key: Task["id"]]: Task; },
        createdAt?: string,
        updatedAt?: string,
    ) {
        super(
            title, content, createdAt, updatedAt
        );
        this.tasks = tasks || {};
    }

    public override getCreateData(): Project {
        this.tasks = undefined;
        return super.getCreateData();
    }

    public static async getAll(): Promise<Array<Project>> {
        return new this("").read()
            .then((entries: Array<TauriResponse>) => { return this.getProjectWithTasks(entries) })
            .catch((error: any) => {
                console.error(error);
                return [];
            })
    }

    private static getProjectWithTasks(projects: Array<TauriResponse>): Array<Project> {
        const projectsWithTasks: Array<Project> = [];
        for (let i = 0; i < projects.length; i++) {
            const tauriResponse = projects[i];
            const project: Project = this.serializeModel(tauriResponse.project);
            project.tasks = Task.serializeModels(tauriResponse.tasks);
            projectsWithTasks.push(project);
        }
        return projectsWithTasks;
    }
}


export class Task extends BaseText {
    projectId: number;
    taskStatus: string;

    constructor(
        projectId: number,
        title: string,
        taskStatus = "to-do",
        content = "",
        createdAt?: string
    ) {
        super(
            title, content, createdAt
        );
        this.projectId = projectId;
        this.taskStatus = taskStatus;
    }

    public static override serializeModels(entries: Array<object>): { [key: Task["id"]]: Task; } {
        const newEntries: { [key: Task["id"]]: Task; } = {};
        for (let i = 0; i < entries.length; i++) {
            const newTask = this.serializeModel<Task>(entries[i]);
            newEntries[newTask.id] = newTask;
        }
        return newEntries;
    }
}
