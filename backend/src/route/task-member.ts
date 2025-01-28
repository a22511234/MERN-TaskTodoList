import { FastifyInstance, RouteShorthandOptions } from "fastify";
import * as TaskRepoImpl from "../repository/task";
import { patchTask } from "../types/Params/patchTask";

const taskMemberRoutes = (
  server: FastifyInstance,
  opts: RouteShorthandOptions,
  done: (error?: Error) => void
) => {
  server.get<{ Params: { userId: string } }>(
    "/:userId",
    async (request, reply) => {
      try {
        const { userId } = request.params;
        const tasks = await TaskRepoImpl.getTasksAssignedToStudent(userId);
        // Filter and format tasks to include only the required fields
        const filteredTasks = tasks.map((task: any) => ({
          id: task.id,
          taskTitle: task.taskTitle,
          taskDescription: task.taskDescription,
          startTime: task.startTime,
          endTime: task.endTime,
          alertTime: task.alertTime,
          createdBy: task.createdBy,
          studentStatuses: task.studentStatuses.find(
            (status: { userId: string }) => status.userId === userId
          ).status,
        }));
        return reply.status(200).send({ task: filteredTasks });
      } catch (error) {
        return reply
          .status(500)
          .send({ msg: `Internal Server Error: ${error}` });
      }
    }
  );

  // 學生更新任務狀態
  server.patch<{ Params: { taskId: string } }>(
    "/:taskId/status",
    async (request, reply) => {
      try {
        const { taskId } = request.params;
        const { userId, status } = request.body as patchTask;

        const task = await TaskRepoImpl.getTaskById(taskId);

        if (!task) return reply.status(404).send({ error: "Task not found" });

        // Check if the userId is in the assignedTo array
        if (!task.assignedTo.includes(userId)) {
          return reply
            .status(403)
            .send({ error: "You are not assigned to this task" });
        }
        // 更新學生狀態
        task.studentStatuses = task.studentStatuses.map((student) =>
          student.userId === userId
            ? {
                ...student,
                status: status as "not_started" | "in_progress" | "completed",
              }
            : student
        );

        // Save the updated task
        await TaskRepoImpl.updateTask(taskId, task);
        
        console.log("Task",task);

        return reply.status(200).send({ message: "Task status updated successfully" });
      } catch (error) {
        return reply
          .status(500)
          .send({ error: `Internal Server Error: ${error}` });
      }
    }
  );

  done();
};

export default taskMemberRoutes;
