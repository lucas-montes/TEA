import { BaseText } from "./BaseModel";

export default class Project extends BaseText {
    tasks?: { [key: Task["id"]]: Task; };

    constructor(
        title: string,
        content: string = "",
        tasks?: { [key: Task["id"]]: Task; }
    ) {
        super(
            title, content
        );
        this.tasks = tasks;
    }

    getTasks(): Array<Task> {
        return Object.values(this.tasks ? this.tasks : {})
    }
};


export class Task extends BaseText {
    projectId: Project["id"];
    taskStatus: string;

    constructor(
        projectId: number,
        title: string,
        taskStatus: string = "to-do",
        content: string = "",
        createdAt?: string
    ) {
        super(
            title, content, createdAt
        );
        this.projectId = projectId;
        this.taskStatus = taskStatus;
    }
};