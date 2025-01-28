"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TaskRepoImpl = __importStar(require("../repository/task"));
const mongoose_1 = require("mongoose");
const alert_1 = require("../service/alert");
const taskSchema_1 = require("../types/Validation/taskSchema");
const taskRoutes = (server, opts, done) => {
    server.get("/", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tasks = yield TaskRepoImpl.getTasks();
            return reply.status(200).send({ tasks });
        }
        catch (error) {
            return reply.status(500).send({ msg: `Internal Server Error: ${error}` });
        }
    }));
    server.post("/", taskSchema_1.routeOptions, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const taskBody = request.body;
            const task = yield TaskRepoImpl.addTask(taskBody);
            // �o�e�q�����������ǥ�
            yield (0, alert_1.sendTaskNotifications)(taskBody.assignedTo, taskBody.taskTitle);
            return reply.status(201).send({ task });
        }
        catch (error) {
            return reply.status(500).send({ msg: `Internal Server Error: ${error}` });
        }
    }));
    // server.put<{ Params: IdParams }>(
    server.delete("/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = request.params.id;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                return reply.status(400).send({ msg: `Invalid id` });
            }
            const task = yield TaskRepoImpl.deleteTask(id);
            if (!task) {
                return reply.status(404).send({ msg: "Task not found" });
            }
            return reply.status(200).send({ task });
        }
        catch (error) {
            return reply.status(500).send({ msg: `Internal Server Error: ${error}` });
        }
    }));
    done();
};
exports.default = taskRoutes;
