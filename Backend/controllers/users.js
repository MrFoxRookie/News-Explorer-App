import { UserModel } from "../models/local-file-system/user.js";

import { validateSignup, validateSignin } from "../schemas/users.js";

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
      console.log("hola");
      const result = validateSignin(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
      }

      const authorizedUser = await UserModel.signin({ input: result.data });

      res.status(201).json(authorizedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
