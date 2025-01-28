"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeOptions = void 0;
const TaskValidationSchema = {
    type: "object",
    required: [
        "taskTitle",
        "startTime",
        "endTime",
        "alertTime",
        "isCompleted",
        "assignedTo",
        "createdBy",
    ],
    properties: {
        taskTitle: { type: "string", minLength: 1, maxLength: 100 },
        taskDescription: { type: "string", minLength: 1, maxLength: 500 },
        startTime: { type: "string", format: "date-time" },
        endTime: { type: "string", format: "date-time" },
        alertTime: { type: "string", format: "date-time" },
        isCompleted: { type: "boolean" },
        assignedTo: {
            type: "array",
            items: { type: "string" },
        },
        createdBy: { type: "string" },
    },
    additionalProperties: false, // �T���B�~���ݩ�
};
exports.routeOptions = {
    schema: {
        body: TaskValidationSchema,
    },
};
