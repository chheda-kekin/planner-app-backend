export type Label = {
    color: string;
    value: string;
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
