import "dotenv/config";
import express from "express";
import { createContainer } from "./container";
import { configureRedisLogger, connectRedis } from "./redisConfig/redis";



async function run(){
const app = express();
const PORT = 4000;

  const container = await createContainer();

configureRedisLogger(container.logger);

app.use(express.json());

app.use("/api/posts", container.postController);

app.use(container.customExceptionHandler);

app.listen(PORT, async () => {
    await connectRedis();  
    container.logger.info(`Server is running on port ${PORT}`);
});
}

run();
