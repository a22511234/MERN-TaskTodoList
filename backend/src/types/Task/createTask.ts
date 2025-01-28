export type createTask = {
    taskTitle: string;
    taskDescription: string;
    startTime: Date;
    endTime: Date;
    alertTime: Date;
    createdBy: string; // �Ыت� userId
    isCompleted: boolean; // ���ȬO�_���i�椤 (�w��Z��/���v)
    studentStatuses: Array<{
      userId: string; // �ǥͪ� userId
      status: "not_started" | "in_progress" | "completed"; // �ǥͪ����Ȫ��A
    }>; // �ǥͱM�Ϊ��A�P�޲z
    assignedTo: Array<string>; // �Q�������ǥͦC�� (�Z��/���v�M��)
  };
  