import { FastifyInstance, RouteShorthandOptions } from "fastify";
import * as TaskRepoImpl from "../repository/task";
import { Task } from "../types/Task/task";
import { Types } from "mongoose";
import { IdParams } from "../types/Params/IdParams";
import {
  notifyAssignedStudentsOnDelete,
  sendTaskNotifications,
} from "../service/alert";
import { routeOptions } from "../types/Validation/taskSchema";

const taskRoutes = (
  server: FastifyInstance,
  opts: RouteShorthandOptions,
  done: (error?: Error) => void
) => {
  server.get("/", async (request, reply) => {
    try {
      const tasks = await TaskRepoImpl.getTasks();
      return reply.status(200).send({ tasks });
    } catch (error) {
      return reply.status(500).send({ msg: `Internal Server Error: ${error}` });
    }
  });
  server.post("/", routeOptions, async (request, reply) => {
    try {
      const taskBody = request.body as Task;

      // 初始化學生任務狀態
      const studentStatuses = taskBody.assignedTo.map((studentId) => ({
        userId: studentId,
        status: "not_started",
      }));

      // Merge studentStatuses into the task body
      const createTask = {
        ...taskBody,
        studentStatuses,
      };

      console.log("Task",createTask)
      const task = await TaskRepoImpl.addTask(createTask);

      // 發送通知給指派的學生
      await sendTaskNotifications(taskBody.assignedTo, taskBody.taskTitle);

      return reply.status(201).send({ task });
    } catch (error) {
      return reply.status(500).send({ msg: `Internal Server Error: ${error}` });
    }
  });
  // server.put<{ Params: IdParams }>(
  server.delete<{ Params: IdParams }>("/:id", async (request, reply) => {
    try {
      const id = request.params.id;
      if (!Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ msg: `Invalid id` });
      }
      const task = await TaskRepoImpl.deleteTask(id);
      if (!task) {
        return reply.status(404).send({ msg: "Task not found" });
      }
      // 發送通知給指派的學生
      await notifyAssignedStudentsOnDelete(task);

      return reply.status(200).send({ task });
    } catch (error) {
      return reply.status(500).send({ msg: `Internal Server Error: ${error}` });
    }
  });

  server.delete("/deleteAll", async (request, reply) => {
    try {
      const result = await TaskRepoImpl.deleteAllTasks();
      return reply
        .status(200)
        .send({ msg: "All tasks deleted", deletedCount: result.deletedCount });
    } catch (error) {
      return reply.status(500).send({ msg: `Internal Server Error: ${error}` });
    }
  });
  done();
};

export default taskRoutes;
