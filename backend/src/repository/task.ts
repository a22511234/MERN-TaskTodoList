import { createTask } from "../types/Task/createTask";
import { Task } from "../types/Task/task";
import TaskModel from "./../models/task";

export const getTasks: () => Promise<Array<createTask>> = () => TaskModel.find({});
export const getTaskById:(taskId: string) => Promise<createTask> = async (taskId: string) => {
  return await TaskModel.findById(taskId).exec();
};
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

export const updateTask = async (taskId: string, taskBody: Partial<Task>) => {
  return TaskModel.findByIdAndUpdate(taskId, taskBody, { new: true });
};