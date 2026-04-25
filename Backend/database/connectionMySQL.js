import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  port: 3306,
  database: "news_explorer_app",
  user: "root",
  password: "",
});

//Aqui se crea el pull de conexiones.
