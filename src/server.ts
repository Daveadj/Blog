import "dotenv/config";
import express from "express";
import { container } from "./container";
import { configureRedisLogger, connectRedis } from "./redisConfig/redis";

const app = express();
const PORT = 4000;

configureRedisLogger(container.logger);

app.use(express.json());

app.use("/api/posts", container.postController);

app.use(container.customExceptionHandler);

app.listen(PORT, async () => {
    await connectRedis();  
    container.logger.info(`Server is running on port ${PORT}`);
});
