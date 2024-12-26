"use server";

import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Verifica si las credenciales son correctas
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    // Establece la cookie de autenticación
    (await cookies()).set("auth", "true", { httpOnly: true });
    console.log("Cookie de autenticación establecida correctamente");
    return { success: true };
  } else {
    // Establece la cookie de autenticación en false
    (await cookies()).set("auth", "false", { httpOnly: true });
    console.log("Cookie de autenticación establecida en false");
    return { success: false, error: "Invalid email or password" };
  }
}
