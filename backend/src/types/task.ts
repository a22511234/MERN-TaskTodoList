export type Task = {
  taskTitle: string;
  taskDescription: string;
  startTime: Date;
  endTime: Date;
  alertTime: Date;
  isCompleted: boolean;
  assignedTo: Array<string>;
  createdBy: string;
};
