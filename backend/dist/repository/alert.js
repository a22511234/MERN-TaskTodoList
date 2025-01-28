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
exports.deleteAllAlerts = exports.addAlert = exports.getAlerts = void 0;
const alert_1 = __importDefault(require("./../models/alert"));
const getAlerts = () => alert_1.default.find({});
exports.getAlerts = getAlerts;
const addAlert = (alertBody) => alert_1.default.create(alertBody);
exports.addAlert = addAlert;
const deleteAllAlerts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield alert_1.default.deleteMany({});
});
exports.deleteAllAlerts = deleteAllAlerts;
