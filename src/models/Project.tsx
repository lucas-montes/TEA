import { BaseText } from "./BaseModel";

export default class Project extends BaseText {
    tasks?: { [key: Task["id"]]: Task; };

    constructor(
        title: string,
        content = "",
        tasks?: { [key: Task["id"]]: Task; },
        createdAt?: string,
    ) {
        super(
            title, content, createdAt
        );
        this.tasks = tasks || {};
    }

    getTasks(): Array<Task> {
        return Object.values(this.tasks ? this.tasks : {})
    }

    public getCreateData() {
        this.tasks = undefined;
        return super.getCreateData();
    }
};


export class Task extends BaseText {
    projectId: Project["id"];
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
};
