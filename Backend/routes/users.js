import { Router } from "express";

import { UserController } from "../controllers/users.js";

import { auth } from "../middlewares/auth.js";

export const usersRouter = Router();

usersRouter.post("/signup", UserController.signup);
// usersRouter.post("/", UserController.signin);

usersRouter.post("/signin", UserController.signin);

usersRouter.get("/me", auth, UserController.getCurrentUser); //El id esta dentro del token y, al pasar por el auth, esto hace que ahora el id se pueda extraer del req del usuario
