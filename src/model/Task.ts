import { Label, Status, Priority } from "../constants.js";

class Task {
    name: string;
    planId: number;
    assignee: number;
    members: number[];
    labels: Label[];
    start: number;
    due: number;
    status: Status;
    priority: Priority;
    created: number;
    updated: number;
    notes: string;

    constructor(name: string, planId: number, members: number[], assignee: number, labels: Label[], start: number, due: number, status: Status, priority: Priority, created: number, updated: number, notes: string) {
        this.name = name;
        this.planId = planId;
        this.members = members;
        this.labels = labels;
        this.start = start;
        this.due = due;
        this.status = status;
        this.priority = priority;
        this.created = created;
        this.updated = updated;
        this.notes = notes;
        this.assignee = assignee;
    }
}

export default Task;