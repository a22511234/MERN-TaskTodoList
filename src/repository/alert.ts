import { Alert } from "./../types/alert";
import AlertModel from "./../models/alert";

export const getAlerts: () => Promise<Array<Alert>> = () => AlertModel.find({});
export const addAlert: (alertBody: Alert) => Promise<Alert> = (alertBody) =>
    AlertModel.create(alertBody);
export const deleteAllAlerts = async () => {
    return await AlertModel.deleteMany({});
  };
