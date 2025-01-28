import { Task } from "./../types/task";
import TaskModel from "./../models/task";

export const getTasks: () => Promise<Array<Task>> = () => TaskModel.find({});
export const addTask: (taskBody: Task) => Promise<Task> = (taskBody) =>
  TaskModel.create(taskBody);
export const deleteTask: (id: string) => Promise<Task | null> = (id) => {
  return TaskModel.findByIdAndDelete(id);
};
export const deleteAllTasks = async () => {
    return await TaskModel.deleteMany({});
  };
export const getTasksAssignedToStudent = async (userId: string) => {
  return await TaskModel.find({ assignedTo: userId }).exec();
};

