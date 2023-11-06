export const planSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 3,
            "maxLength": 50,
            "format": "containsSpecialChars"
        }
    },
    "required": ["name"]
};

export const taskSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "planId": {
            "type": "integer"
        },
        "name": {
            "type": "string",
            "minLength": 3,
            "maxLength": 50,
            "format": "containsSpecialChars"
        },
        "status": {
            "type": "string",
            "format": "isValidTaskStatus"
        },
        "priority": {
            "type": "string",
            "format": "isValidTaskPriority"
        },
        "startDate": {
            "type": "integer",
            "format": "isValidDate"
        },
        "dueDate": {
            "type": "integer",
            "format": "isValidDate"
        },
        "created": {
            "type": "integer",
            "format": "isValidDate"
        },
        "updated": {
            "type": "integer",
            "format": "isValidDate"
        },
        "notes": {
            "type": "string",
            "format": "containsSpecialChars"
        },
        "members": {
            "type": "array",
            "items": {
                "type": "integer"
            },
            "format": "nonEmptyMembersList"
        },
        "labels": {
            "type": "array",
            "items": {
                "type": "object"
            }
        },
        "comments": {
            "type": "array",
            "items": {
                "type": "object"
            }
        }
    },
    "required": [
                    "planId",
                    "name", 
                    "status", 
                    "priority", 
                    "startDate", 
                    "dueDate", 
                    "created", 
                    "updated",
                    "notes",
                    "members",
                    "labels",
                    "comments"
                ]
};