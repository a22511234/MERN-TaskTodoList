"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.establishConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const establishConnection = (connectionString) => {
    mongoose_1.default.connect(connectionString)
        .then(() => {
        console.log(`MongoDB connection successful`);
    })
        .catch((error) => {
        console.log(`Error in DB connection: ${error}`);
    });
};
exports.establishConnection = establishConnection;
