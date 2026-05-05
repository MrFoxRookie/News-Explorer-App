import { UserModel } from "../models/mysql/users.js";

import { validateSignup, validateSignin } from "../schemas/users.js";

import jwt from "jsonwebtoken";

export class UserController {
  static async signup(req, res) {
    try {
      const result = validateSignup(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues }); //en result.error.issues estan los errores que arroja el schema
      }

      const newUser = await UserModel.signup({ input: result.data });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message }); // Este es el error capturado desde el Model o desde cualquier parte del código. error.message contiene el mensaje del error lanzado o generado por Node.
    }
  }

  static async signin(req, res) {
    try {
      const result = validateSignin(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
      }

      const authorizedUser = await UserModel.signin({ input: result.data });

      const token = jwt.sign(
        {
          id: authorizedUser.user_id,
          email: authorizedUser.email,
          username: authorizedUser.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      res.status(200).json({ token, authorizedUser });
      console.log("signin completado");
    } catch (error) {
      console.log(error);

      res.status(401).json({ error: error.message });
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const user = await UserModel.getById(req.user.id);

      res.json(user);
    } catch (error) {
      console.log("ERROR /me:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
