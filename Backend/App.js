import express, { json } from "express";
import cors from "cors";
import { usersRouter } from "./routes/users.js";
import { savedNewsRouter } from "./routes/savedNews.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? "https://news-explorer-app-three.vercel.app"
    : "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(json()); //json es un middleware de Express. Sirve para leer datos JSON que vienen en el body de una petición
app.disable("x-powered-by"); //Le dice a Express que no envíe este header en las respuestas HTTP, dando pistas a posibles atacantes.

app.use("/users", usersRouter);

app.use("/saved-news", savedNewsRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
