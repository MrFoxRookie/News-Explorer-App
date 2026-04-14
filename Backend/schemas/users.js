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

export function validateSignup(input) {
  return signupSchema.safeParse(input);
}

export function validateSignin(input) {
  return signinSchema.safeParse(input);
}
