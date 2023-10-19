

class Label {
    color: string;
    value: string;
    taskId: number;
    created: number;
    updated: number;

    constructor(color: string, value: string, taskId: number, created: number, updated: number) {
        this.color = color;
        this.value = value;
        this.taskId = taskId;
        this.created = created;
        this.updated = updated;
    }
}

export default Label;