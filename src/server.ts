import "dotenv/config";
import express from "express";
import postController from "./controllers/postController";

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/api/posts", postController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
