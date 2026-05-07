// Ese código usa el paquete cors, que NO viene por defecto.

// npm install cors

// Es un middleware de CORS personalizado.

//Controla qué dominios pueden hacer requests a tu backend

import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:5173",
  "https://news-explorer-app-three.vercel.app/",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  });
