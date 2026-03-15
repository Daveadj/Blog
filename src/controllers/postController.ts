import { Router } from "express";
import { BlogParams } from "../Dtos/blogParams";
import { IPostService } from "../service/PostService";
import { AppLogger } from "../utils/logger.interface";

export function createPostController(
  postService: IPostService,
  logger: AppLogger
): Router {
  const router = Router();

  router.get("/", async (req, res) => {
    try {
      const params = new BlogParams();

    params.pageNumber = req.query.pageNumber
      ? parseInt(req.query.pageNumber as string, 10)
      : 1;

    params.pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize as string, 10)
      : 10;

    if (req.query.searchTerm) {
      params.searchTerm = req.query.searchTerm as string;
    }

    if (req.query.dateFrom) {
      params.dateFrom = new Date(req.query.dateFrom as string);
    }

    if (req.query.dateTo) {
      params.dateTo = new Date(req.query.dateTo as string);
    }

      const response = await postService.findAll(params);
      return res.json(response);
    } catch (err) {
      logger.error("Failed to fetch posts", {
        method: req.method,
        path: req.originalUrl,
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined
      });
      res.status(500).json({ message: "Internal server error" });
    }
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

  return router;
}
