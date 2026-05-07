import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

export const pool = mysql.createPool(process.env.DATABASE_URL);
