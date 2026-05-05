import { ur } from "zod/v4/locales";
import { pool } from "../../database/connectionMySQL.js";
import bcrypt from "bcrypt";

export class SavedNewsModel {
  static async addArticle({ input, user_id }) {
    const connection = await pool.getConnection(); //Es lo que permite que se haga una transaccion para que las 2 querys se ejecuten como una sola operacion. Si todas salen bien → COMMIT, si una falla → ROLLBACK

    try {
      const {
        description,
        publishedAt,
        source,
        title,
        url,
        urlToImage,
        keyword,
      } = input;

      let articleId;

      await connection.beginTransaction();

      const [rows] = await connection.query(
        `SELECT * FROM articles WHERE url = ?`,
        [url],
      );

      if (rows.length === 0) {
        const [result] = await connection.query(
          `INSERT INTO articles
        (description, publishedAt, source, title, url, urlToImage)
        VALUES (?, ?, ?, ?, ?, ?)`,
          [description, publishedAt, source, title, url, urlToImage],
        );

        articleId = result.insertId; //El id generado de la tabla como PK
      } else {
        articleId = rows[0].article_id;
      }

      await connection.query(
        `INSERT INTO saved_articles
        (user_id, article_id, keyword)
        VALUES (?, ?, ?)`,
        [user_id, articleId, keyword],
      );

      await connection.commit();

      return {
        article_id: articleId,
        description,
        publishedAt,
        source,
        title,
        url,
        urlToImage,
        keyword,
      };
    } catch (error) {
      await connection.rollback();
      throw new Error(error.message);
    } finally {
      connection.release();
    }
  }

  static async getArticles(user_id) {
    try {
      const [result] = await pool.query(
        `SELECT articles.*, saved_articles.keyword
       FROM articles 
       JOIN saved_articles 
       ON articles.article_id = saved_articles.article_id
       WHERE saved_articles.user_id = ?;`,
        [user_id],
      );

      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async deleteArticles({ user_id, article_id }) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        `DELETE FROM saved_articles
WHERE user_id = ? AND article_id = ?`,
        [user_id, article_id],
      );

      const [rows] = await connection.query(
        "SELECT 1 FROM saved_articles WHERE article_id = ? LIMIT 1",
        [article_id],
      );

      if (rows.length === 0) {
        await connection.query("DELETE FROM articles WHERE article_id = ?", [
          article_id,
        ]);
      }

      await connection.commit();
      return { message: "Artículo eliminado correctamente" };
    } catch (err) {
      await connection.rollback();
      res.status(500).json({ error: err.message });
    } finally {
      connection.release();
    }
  }
}
