import { Router } from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.controllers.js";

//midlewares
import { verifyToken } from "../midlewares/token.midleware.js";

const router = Router();

//rutas
router.get("/posts", verifyToken, getPosts);
router.post("/posts", verifyToken, createPost);
router.put("/posts/:id", verifyToken, updatePost);
router.delete("/posts/:id", verifyToken, deletePost);

export default router;
