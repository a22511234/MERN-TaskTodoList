"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverStart = exports.serverOf = void 0;
const fastify_1 = __importDefault(require("fastify"));
const task_admin_1 = __importDefault(require("./route/task-admin"));
const mongoose_1 = require("./plugins/mongoose");
const alert_1 = __importDefault(require("./route/alert"));
const task_member_1 = __importDefault(require("./route/task-member"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const fastify_keycloak_adapter_1 = __importDefault(require("fastify-keycloak-adapter"));
const serverOf = () => {
    const server = (0, fastify_1.default)({
        logger: {
            transport: {
                target: "pino-pretty",
            },
            level: "debug",
        },
    });
    const opts = {
        appOrigin: "http://localhost:8888",
        keycloakSubdomain: "localhost:8080/realms/fastify-task",
        clientId: "client01",
        clientSecret: "xZwukPjGmzeeGN1QEL971P7JBxIUhb2o",
    };
    server.get("/user", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const user = request.session.user;
        return reply.status(200).send({ user });
    }));
    server.get("/ping", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return reply.status(200).send({ msg: "pong" });
    }));
    server.register(fastify_keycloak_adapter_1.default, opts);
    server.register(task_admin_1.default, { prefix: "/api/v1/tasks" });
    server.register(task_member_1.default, { prefix: "/api/v1/tasks/member" });
    server.register(alert_1.default, { prefix: "/api/v1/alerts" });
    server.register(static_1.default, {
        root: path_1.default.join(__dirname, "../../frontend/dist"),
        prefix: "/",
    });
    server.ready(() => {
        console.log(server.printRoutes());
    });
    return server;
};
exports.serverOf = serverOf;
const serverStart = (port) => (server) => __awaiter(void 0, void 0, void 0, function* () {
    const listenAddress = "0.0.0.0";
    const fastifyConfig = {
        port: port,
        host: listenAddress,
    };
    yield server.listen(fastifyConfig);
    const connectionString = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/myMERN";
    yield (0, mongoose_1.establishConnection)(connectionString);
    return server;
});
exports.serverStart = serverStart;
