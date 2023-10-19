class Comment {
    comment: string;
    taskId: number;
    memberId: number;
    created: number;
    updated: number;

    constructor(comment: string, taskId: number, memberId: number, created: number, updated: number) {
        this.comment = comment;
        this.taskId = taskId;
        this.memberId = memberId;
        this.created = created;
        this.updated = updated;
    }
}

export default Comment;