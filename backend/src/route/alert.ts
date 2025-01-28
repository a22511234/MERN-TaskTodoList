import { FastifyInstance, RouteShorthandOptions } from "fastify";
import * as AlertRepoImpl from "../repository/alert";

const alertRoutes = (
  server: FastifyInstance,
  opts: RouteShorthandOptions,
  done: (error?: Error) => void
) => {
  server.get("/", async (request, reply) => {
    try {
      const alerts = await AlertRepoImpl.getAlerts();
      return reply.status(200).send({ alerts });
    } catch (error) {
      return reply.status(500).send({ msg: `Internal Server Error: ${error}` });
    }
  });

  server.delete("/", async (request, reply) => {
    try {
      const result = await AlertRepoImpl.deleteAllAlerts();
      return reply.status(200).send({ msg: "All alerts deleted", deletedCount: result.deletedCount });
    } catch (error) {
      return reply.status(500).send({ msg: `Internal Server Error: ${error}` });
    }
  });

  done();
};

export default alertRoutes;
