import fastify, { FastifyInstance, FastifyRequest } from "fastify";
import taskRoutes from "./route/task-admin";
import { establishConnection } from "./plugins/mongoose";
import alertRoutes from "./route/alert";
import taskMemberRoutes from "./route/task-member";
import fastifyStatic from "@fastify/static";
import path from "path";
import keycloak, { KeycloakOptions } from "fastify-keycloak-adapter";

export const serverOf: () => FastifyInstance = () => {
  const server = fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
      level: "debug",
    },
  });

  const opts: KeycloakOptions = {
    appOrigin: "http://localhost:8888",
    keycloakSubdomain: "localhost:8080/realms/fastify-task",
    clientId: "client01",
    clientSecret: "xZwukPjGmzeeGN1QEL971P7JBxIUhb2o",
  };

  server.get("/user", async (request, reply) => {
    const user = (request as FastifyRequest & { session: { user: any } }).session.user;
    return reply.status(200).send({ user });
  });

  server.get("/ping", async (request, reply) => {
    return reply.status(200).send({ msg: "pong" });
  });
  server.register(keycloak, opts);
  server.register(taskRoutes, { prefix: "/api/v1/tasks" });
  server.register(taskMemberRoutes, { prefix: "/api/v1/tasks/member" });
  server.register(alertRoutes, { prefix: "/api/v1/alerts" });
  server.register(fastifyStatic, {
    root: path.join(__dirname, "../../frontend/dist"),
    prefix: "/",
  });
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
