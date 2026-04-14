import { randomUUID } from "node:crypto";
import { readJSON } from "../../utils.js";
// Se usa para leer archivos JSON en un entorno con módulos ES,
// ya que no se puede usar require directamente.
// En este caso, permite cargar los datos desde users.json como si fuera una base de datos simulada.

import fs from "node:fs/promises"; //Para sobrescribir la base local que se tiene por el momento. Se tiene que agregar /promises ya que se estan usando promises

// const users = readJSON("./users.json"); // No se usa: ahora se maneja el JSON con fs/promises para persistencia

export class UserModel {
  static async signup({ input }) {
    const newUser = { id: randomUUID(), ...input };

    // Se obtiene el contenido del archivo como string
    const usersFile = await fs.readFile("./users.json", "utf-8");

    // Se convierte el string a un array de objetos de JavaScript
    const users = JSON.parse(usersFile);

    // console.log(users.email);

    if (users.some((user) => user.email === newUser.email)) {
      throw new Error("Email ya registrado");
    }

    if (users.some((user) => user.username === newUser.username)) {
      throw new Error("Nombre de usuario no disponible");
    }

    // Se agrega el nuevo usuario al array
    users.push(newUser);

    // Se sobrescribe el archivo con el contenido actualizado
    await fs.writeFile("./users.json", JSON.stringify(users, null, 2));

    return newUser;
  }
}
