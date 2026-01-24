"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const postController_1 = __importDefault(require("./controllers/postController"));
const customExceptionHandler_1 = require("./exceptions/customExceptionHandler");
const redis_1 = require("./redisConfig/redis");
const app = (0, express_1.default)();
const PORT = 4000;
app.use(express_1.default.json());
app.use("/api/posts", postController_1.default);
app.use(customExceptionHandler_1.customExceptionHandler);
app.listen(PORT, async () => {
    await (0, redis_1.connectRedis)();
    console.log(`Server is running on port ${PORT}`);
});
