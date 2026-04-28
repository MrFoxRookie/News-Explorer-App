import { ur } from "zod/v4/locales";
import { pool } from "../../database/connectionMySQL.js";
import bcrypt from "bcrypt";

export class SavedNewsModel {
  static async addArticle({ input, user_id }) {
    const connection = await pool.getConnection(); //Es lo que permite que se haga una transaccion para que las 2 querys se ejecuten como una sola operacion. Si todas salen bien → COMMIT, si una falla → ROLLBACK

    try {
      const { description, publishedAt, source, title, url, urlToImage } =
        input;

      await connection.beginTransaction(); 

      const [result] = await connection.query(
        `INSERT INTO articles
        (description, publishedAt, source, title, url, urlToImage)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [description, publishedAt, source, title, url, urlToImage],
      );

      await connection.query(
        `INSERT INTO saved_articles
        (user_id, article_id)
        VALUES (?, ?)`,
        [user_id, result.insertId],
      );

      await connection.commit();

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
      await connection.rollback();
      throw new Error(error.message);
    } finally {
      connection.release();
    }
  }
}
