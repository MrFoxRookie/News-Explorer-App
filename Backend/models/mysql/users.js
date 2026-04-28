import { pool } from "../../database/connectionMySQL.js";
import bcrypt from "bcrypt";

export class UserModel {
  static async getUsers() {
    try {
      const [result] = await pool.query(
        "SELECT user_id, name, last_name, email, password FROM users;",
      );
      console.table(result);
    } catch (err) {
      console.log(err);
    }
  }

  static async signup({ input }) {
    try {
      const { email, password, username } = input;

      const [existing] = await pool.query(
        "SELECT user_id FROM users WHERE email = ?",
        [email],
      );

      if (existing.length > 0) {
        throw new Error("Email ya registrado");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await pool.query(
        `INSERT INTO users (email, password, username)
   VALUES (?, ?, ?)`,
        [email, hashedPassword, username],
      );
      return {
        user_id: result.insertId,
        email,
        username,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async signin({ input }) {
    try {
      const { email, password } = input;

      const [rows] = await pool.query(
        `SELECT user_id, email, username, password
       FROM users
       WHERE email = ?`,
        [email],
      );

      if (rows.length === 0) {
        throw new Error("Email y/o contraseña incorrectos");
      }

      const user = rows[0];

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error("Email y/o contraseña incorrectos");
      }

      return {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
      };
    } catch (error) {
      throw error;
    }
  }
  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT user_id, username, email FROM users WHERE user_id = ?",
      [id],
    );

    return rows[0];
  }
}
