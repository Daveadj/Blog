import "dotenv/config";
import express from "express";
import postController from "./controllers/postController";
import { customExceptionHandler } from "./exceptions/customExceptionHandler";
import { connectRedis } from "./redisConfig/redis";

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/api/posts", postController);

app.use(customExceptionHandler);

app.listen(PORT, async () => {
    await connectRedis();  
    console.log(`Server is running on port ${PORT}`);
});
