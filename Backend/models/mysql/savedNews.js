import { ur } from "zod/v4/locales";
import { pool } from "../../database/connectionMySQL.js";
import bcrypt from "bcrypt";

export class SavedNewsModel {
  static async addArticle({ input, user_id }) {
    try {
      const { description, publishedAt, source, title, url, urlToImage } =
        input;

      const [result] = await pool.query(
        `INSERT INTO articles (description, publishedAt, source, title, url, urlToImage) VALUES (?, ?, ?, ?, ?, ? )`,
        [description, publishedAt, source, title, url, urlToImage],
      );
      console.log("query 1");

      await pool.query(
        `INSERT INTO saved_articles (user_id, article_id) VALUES (?, ?)`,
        [user_id, result.insertId],
      );

      console.log("query 2");

      return {
        article_id: result.insertId,
        description,
        publishedAt,
        source,
        title,
        url,
        urlToImage,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
