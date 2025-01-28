export type Task = {
  taskTitle: string;
  taskDescription: string;
  startTime: Date;
  endTime: Date;
  alertTime: Date;
  createdBy: string; // �Ыت� userId
  isCompleted: boolean; // ���ȬO�_���i�椤 (�w��Z��/���v)
  assignedTo: Array<string>; // �Q�������ǥͦC�� (�Z��/���v�M��)
};
