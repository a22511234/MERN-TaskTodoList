export type Task = {
  taskTitle: string;
  taskDescription: string;
  startTime: Date;
  endTime: Date;
  alertTime: Date;
  createdBy: string; // 創建者 userId
  isCompleted: boolean; // 任務是否仍進行中 (針對班長/講師)
  assignedTo: Array<string>; // 被指派的學生列表 (班長/講師專用)
};
