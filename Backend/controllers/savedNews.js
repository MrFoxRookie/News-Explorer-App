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

      const newArticle = await SavedNewsModel.addArticle({
        input: result.data,
        user_id: user_id,
      });
      res.status(201).json(newArticle);
      console.log(newArticle);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
