import { Validator, ValidatorResult, ValidationError } from "jsonschema";
import { Request } from "express";
import { ErrorType, Status, Priority, Label, CommentType } from "./constants.js";
import { taskSchema, planSchema } from "./validationSchema.js";

export function containsSpecialChars(str: string): boolean {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return ! specialChars.test(str);
}

Validator.prototype.customFormats.containsSpecialChars = containsSpecialChars;

export function isValidDate(input: number): boolean {
    const dateStr = new Date(input).toDateString();
    return dateStr !== "Thu Jan 01 1970";
}

Validator.prototype.customFormats.isValidDate = isValidDate;

export function isValidTaskStatus(status: string): boolean {
    return status === Status.NotStarted || status === Status.InProgress || status === Status.Completed;    
}

Validator.prototype.customFormats.isValidTaskStatus = isValidTaskStatus;

export function isValidTaskPriority(priority: string): boolean {
    return priority === Priority.Low || priority === Priority.Medium || priority === Priority.Urgent || priority === Priority.Important;
}

Validator.prototype.customFormats.isValidTaskPriority = isValidTaskPriority;

export function nonEmptyMembersList(members: number[]): boolean {
    return members.length > 0
}

Validator.prototype.customFormats.nonEmptyMembersList = nonEmptyMembersList;

export function validateTaskRequestBody(requestBody: any): ValidatorResult {
    const v = new Validator();
    return v.validate(requestBody, taskSchema);
}

export function validatePlanRequestBody(requestBody: Request): ValidatorResult {
    const v = new Validator();
    return v.validate(requestBody, planSchema);
}

export function processValidationErrors(validationErrs: ValidationError[]): ErrorType[] {
    
    let allErrs: ErrorType[] = [];
    validationErrs.forEach(({path, message}) => allErrs.push({path, message}));

    return allErrs;
}

export function getLabelsString(labels: Label[]): string {
    return labels.reduce((acc, {color, value}, index, arr) => {
        acc += `{"color": "${color}", "value": "${value}"}`;
        if(index < arr.length - 1) {
            acc =  acc + ',';
        }

        return acc;
    }, '');
}

export function getCommentsString(comments: CommentType[]): string {
    return comments.reduce((acc, {comment, member}, index, arr) => {
        acc += `{"comment": "${comment}", "member": "${member}"}`;
        if(index < arr.length - 1) {
            acc = acc + ',';
        }

        return acc;
    }, '');     
}