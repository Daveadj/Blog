"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../container");
const blogParams_1 = require("../Dtos/blogParams");
const router = (0, express_1.Router)();
const postService = container_1.container.postService;
router.get("/", async (req, res) => {
    try {
        const params = new blogParams_1.BlogParams();
        params.pageNumber = req.query.pageNumber
            ? parseInt(req.query.pageNumber, 10)
            : 1;
        params.pageSize = req.query.pageSize
            ? parseInt(req.query.pageSize, 10)
            : 10;
        if (req.query.searchTerm) {
            params.searchTerm = req.query.searchTerm;
        }
        if (req.query.dateFrom) {
            params.dateFrom = new Date(req.query.dateFrom);
        }
        if (req.query.dateTo) {
            params.dateTo = new Date(req.query.dateTo);
        }
        const response = await postService.findAll(params);
        return res.json(response);
    }
    catch (err) {
        console.error(err);
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
exports.default = router;
