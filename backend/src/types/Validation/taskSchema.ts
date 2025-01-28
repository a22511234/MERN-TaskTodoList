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
      items: { type: "string"},
    },
    createdBy: { type: "string"},
  },
  additionalProperties: false, // ¸T¤îÃB¥~ªºÄÝ©Ê
};

export const routeOptions = {
  schema: {
    body: TaskValidationSchema,
  },
};
