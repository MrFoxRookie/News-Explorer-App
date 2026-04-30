import { Router } from "express";
import { savedNewsController } from "../controllers/savedNews.js";
import { auth } from "../middlewares/auth.js";

export const savedNewsRouter = Router();

savedNewsRouter.post("/", auth, savedNewsController.addArticle);

savedNewsRouter.get("/", auth, savedNewsController.getArticles);

// savedNewsRouter.delete("/:id", auth, savedNewsController.deleteArticle);
