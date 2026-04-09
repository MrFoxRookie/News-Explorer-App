import http from "node:http";
import fs from "node:fs";
import { validateSignup, validateSignin } from "./schemas/users.js";

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "POST":
      switch (url) {
        case "/signup": {
          let body = "";

          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            const newUser = JSON.parse(body);
            const result = validateSignup.safeParse(newUser);

            if (!result.success) {
              res.writeHead(400, {
                "Content-Type": "application/json",
              });

              return res.end(
                JSON.stringify({
                  error: result.error.issues,
                }),
              );
            }

            const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

            const emailExists = users.some(
              (user) =>
                user.email.toLowerCase() === newUser.email.toLowerCase(),
            );

            if (emailExists) {
              return res.end(
                JSON.stringify({
                  error: "El email ya está registrado",
                }),
              );
            }

            const usernameExists = users.some(
              (user) =>
                user.username.toLowerCase() === newUser.username.toLowerCase(),
            );

            if (usernameExists) {
              return res.end(
                JSON.stringify({ error: "El nombre de usuario ya existe" }),
              );
            }

            users.push(newUser);

            fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

            res.writeHead(200, {
              "Content-Type": "application/json; charset=utf-8",
            });

            newUser.timestamp = Date.now();
            res.end(JSON.stringify(newUser));
          });
          break;
        }

        case "/signin": {
          let body = "";

          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            const currentUser = JSON.parse(body);
            const result = validateSignin.safeParse(currentUser);
            if (!result.success) {
              res.writeHead(400, {
                "Content-Type": "application/json",
              });

              return res.end(
                JSON.stringify({
                  error: result.error.issues,
                }),
              );
            }
            const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

            const user = users.find(
              (user) =>
                user.email === currentUser.email &&
                user.password === currentUser.password,
            );

            if (!user) {
              res.writeHead(401, {
                "Content-Type": "application/json",
              });

              return res.end(
                JSON.stringify({
                  error: "Email o contraseña incorrectos",
                }),
              );
            }

            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify(user));
          });

          break;
        }
      }
      break;
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log("server listening on port http://localhost:1234");
});
