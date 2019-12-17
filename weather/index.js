"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
exports.router = (weatherRepository) => {
    const router = express_1.default.Router();
    const ctr = controller_1.controller(weatherRepository);
    router.get("/", ctr.getAction);
    return router;
};
