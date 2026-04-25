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
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
