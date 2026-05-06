import { Router } from "express";

import { UserController } from "../controllers/users.js";

import { auth } from "../middlewares/auth.js";

export const usersRouter = Router();

usersRouter.post("/signup", UserController.signup);

usersRouter.post("/signin", UserController.signin);

usersRouter.get("/me", auth, UserController.getCurrentUser);
