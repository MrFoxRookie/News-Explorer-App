import { ur } from "zod/v4/locales";
import { pool } from "../../database/connectionMySQL.js";
import bcrypt from "bcrypt";

export class savedNewsModel {
  static async addArticle({ input, user_id }) {
    try {
      const { description, publishedAt, source, title, url, urlToImage } =
        input;

      const [result] = await pool.query(
        `INSERT INTO articles (description, publishedAt, source, title, url, urlToImage) VALUES (?, ?, ?, ?, ?, ? )`,
        [description, publishedAt, source, title, url, urlToImage],
      );
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
