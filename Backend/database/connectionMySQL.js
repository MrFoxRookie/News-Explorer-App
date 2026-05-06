import { createPool } from "mysql2/promise";

// Parse DATABASE_URL when available (production/Railway), otherwise fall back
// to hardcoded localhost values for local development.
function getConnectionConfig() {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    const url = new URL(databaseUrl);
    return {
      host: url.hostname,
      port: Number(url.port) || 3306,
      database: url.pathname.replace(/^\//, ""),
      user: url.username,
      password: url.password,
    };
  }

  // Local development defaults
  return {
    host: "localhost",
    port: 3306,
    database: "news_explorer_app",
    user: "root",
    password: "",
  };
}

export const pool = createPool(getConnectionConfig());

// Aqui se crea el pool de conexiones.
