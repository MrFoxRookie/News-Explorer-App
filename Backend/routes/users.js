import { Router } from "express";

import { UserController } from "../controllers/users.js";

export const usersRouter = Router();

usersRouter.post("/signup", UserController.signup);
// usersRouter.post("/", UserController.signin);
