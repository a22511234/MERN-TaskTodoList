import * as AlertRepoImpl from "../repository/alert";
import { Alert } from "../types/alert";

/**
 * 發送通知給多位學生
 * @param assignedTo 學生 ID 陣列
 * @param taskTitle 任務標題
 */
export const sendTaskNotifications = async (assignedTo: string[], taskTitle: string) => {
  try {
    // 產生通知
    const notifications: Alert[] = assignedTo.map((studentId) => ({
      message: "新任務：" + taskTitle,
      createdAt: new Date(),
      read: false,
      userId: studentId,
    }));

    // 儲存所有通知
    await Promise.all(
      notifications.map(async (notification) => {
        await AlertRepoImpl.addAlert(notification);
      })
    );
  } catch (error) {
    console.error(`Error sending notifications: ${error}`);
    throw error; // 確保錯誤會拋出，以便上層處理
  }
};
