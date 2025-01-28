import * as AlertRepoImpl from "../repository/alert";
import { Alert } from "../types/alert";
import { Task } from "../types/Task/task";

/**
 * 發送任務通知
 * @param assignedTo 
 * @param taskTitle 
 */
export const sendTaskNotifications = async (assignedTo: string[], taskTitle: string) => {
  try {
    const notifications: Alert[] = assignedTo.map((studentId) => ({
      message: "新任務" + taskTitle,
      createdAt: new Date(),
      read: false,
      userId: studentId,
    }));

    await Promise.all(
      notifications.map(async (notification) => {
        await AlertRepoImpl.addAlert(notification);
      })
    );
  } catch (error) {
    console.error(`Error sending notifications: ${error}`);
    throw error; 
  }
};
export const notifyAssignedStudentsOnDelete=async(deletedTask:Task)=>{
  try {
    const notifications: Alert[] = deletedTask.assignedTo.map((studentId) => ({
      message: "任務：" + deletedTask.taskTitle + "已刪除",
      createdAt: new Date(),
      read: false,
      userId: studentId,
    }));
    await Promise.all(
      notifications.map(async (notification) => {
        await AlertRepoImpl.addAlert(notification);
      })
    );
  } catch (error) {
    console.error(`Error sending notifications: ${error}`);
    throw error;
  }
}

export const notifyAssignedStudentsOnUpdate=async(updatedTask:Task)=>{
  try {
    const notifications: Alert[] = updatedTask.assignedTo.map((studentId) => ({
      message: "任務：" + updatedTask.taskTitle + "已更新",
      createdAt: new Date(),
      read: false,
      userId: studentId,
    }));
    await Promise.all(
      notifications.map(async (notification) => {
        await AlertRepoImpl.addAlert(notification);
      })
    );
  } catch (error) {
    console.error(`Error sending notifications: ${error}`);
    throw error;
  }
}