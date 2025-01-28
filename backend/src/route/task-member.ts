import { FastifyInstance, RouteShorthandOptions } from "fastify";
import * as TaskRepoImpl from "../repository/task";

const taskMemberRoutes = (
  server: FastifyInstance,
  opts: RouteShorthandOptions,
  done: (error?: Error) => void
) => {
  server.get<{ Params: { userId: string } }>("/:userId", async (request, reply) => {
    try {
      const { userId } = request.params;
      const tasks = await TaskRepoImpl.getTasksAssignedToStudent(userId);
      return reply.status(200).send({ tasks });
    } catch (error) {
      return reply.status(500).send({ msg: `Internal Server Error: ${error}` });
    }
  });

  done();
};

export default taskMemberRoutes;
