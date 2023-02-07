import { Router } from "express";

import { createUser, login } from "../controllers/user.controllers.js";

const router = Router();

//rutas
router.post("/register", createUser);
router.get("/login", login);

export default router;
