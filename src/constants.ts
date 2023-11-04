export type Label = {
    color: string;
    value: string;
};

export type ErrorType = {
    message: string;
    path: (string| number)[]
}

export type CommentType = {
    comment: string;
    member: number;
}

export enum Status {
    NotStarted = 'Not Started',
    InProgress = 'In Progress',
    Completed = 'Completed'
};

export enum Priority {
    Urgent = 'Urgent',
    Important = 'Important',
    Medium = 'Medium',
    Low = 'Low'
};

export enum Gender {
    Male = 'Male',
    Female = 'Female'
};
