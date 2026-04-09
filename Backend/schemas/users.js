import { z } from "zod";
const signupSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string(),
  username: z.string(),
});

const signinSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export { signupSchema as validateSignup, signinSchema as validateSignin };
