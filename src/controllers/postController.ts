import { Router } from "express";
import { container } from "../container";

const router = Router();
const postService = container.postService;

router.get("/", async (req, res) => {
    const posts = await postService.findAll();
    res.json(posts);
});

router.get("/:id", async (req, res) => {
    const post = await postService.findById(Number(req.params.id));
    res.json(post);
});

router.post("/", async (req, res) => {
    const post = await postService.createPost(req.body);
    res.json(post);
});

router.put("/:id", async (req, res) => {
    const post = await postService.update(Number(req.params.id), req.body);
    res.json(post);
});

router.delete("/:id", async (req, res) => {
    await postService.delete(Number(req.params.id));
    res.json({ message: "Post deleted" });
});

export default router;
