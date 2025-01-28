export type Alert = {
  message: string;
  createdAt: Date;
  read: boolean;
  userId: string; // 針對哪位使用者發送通知
};
