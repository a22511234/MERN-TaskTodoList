import fastify, { FastifyInstance } from "fastify";
import taskRoutes from "./route/task-admin";
import { establishConnection } from "./plugins/mongoose";
import alertRoutes from "./route/alert";
import taskMemberRoutes from "./route/task-member";

export const serverOf: () => FastifyInstance = () => {
  const server = fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
      level: "debug",
    },
  });

  server.get("/ping", async (request, reply) => {
    return reply.status(200).send({ msg: "pong" });
  });

  server.register(taskRoutes, { prefix: "/api/v1/tasks" });
  server.register(taskMemberRoutes, { prefix: "/api/v1/tasks/member" });
  server.register(alertRoutes, { prefix: "/api/v1/alerts" });

  server.ready(() => {
    console.log(server.printRoutes());
  });
  return server;
};

export const serverStart: (
  port: number
) => (server: FastifyInstance) => Promise<FastifyInstance> =
  (port) => async (server) => {
    const listenAddress = "0.0.0.0";
    const fastifyConfig = {
      port: port,
      host: listenAddress,
    };
    await server.listen(fastifyConfig);
    const connectionString =
      process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/myMERN";
    await establishConnection(connectionString);

    return server;
  };
