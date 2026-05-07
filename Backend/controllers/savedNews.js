import { SavedNewsModel } from "../models/mysql/savedNews.js";
import { validateArticle } from "../schemas/savedNews.js";

export class savedNewsController {
  static async addArticle(req, res) {
    try {
      const result = validateArticle(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
      }

      const user_id = req.user.id;

      const { publishedAt, ...rest } = req.body;

      const formattedDateSQL = new Date(publishedAt)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const newArticle = await SavedNewsModel.addArticle({
        input: {
          ...rest,
          publishedAt: formattedDateSQL,
        },
        user_id: user_id,
      });
      res.status(201).json(newArticle);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getArticles(req, res) {
    try {
      const user_id = req.user.id;

      const articlesInformation = await SavedNewsModel.getArticles(user_id);

      res.status(201).json(articlesInformation);
    } catch (err) {
      throw new Error(error.message);
    }
  }

  static async deleteArticles(req, res) {
    try {
      const user_id = req.user.id;
      const { id } = req.params; //este es igual al /:id en el endpoint anterior

      const deletedArticle = await SavedNewsModel.deleteArticles({
        user_id,
        article_id: id,
      });

      res.status(200).json(deletedArticle);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
