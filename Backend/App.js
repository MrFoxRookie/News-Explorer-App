import express, { json } from "express";
import { usersRouter } from "./routes/users.js";
import { corsMiddleware } from "./middlewares/cors.js";
import cors from "cors"; //Cors ya funciona, pero se podria mejorar.

const app = express();
app.use(json()); //👉 json es un middleware de Express. Sirve para leer datos JSON que vienen en el body de una petición
app.disable("x-powered-by"); //Le dice a Express que no envíe este header en las respuestas HTTP, dando pistas a posibles atacantes.

app.use(cors());

app.use("/users", usersRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
