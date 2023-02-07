import { Router } from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.controllers.js";

//midlewares
import { verifyToken } from "../controllers/user.controllers.js";

const router = Router();

//rutas
router.get("/posts", verifyToken, getPosts);
router.post("/posts", createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
