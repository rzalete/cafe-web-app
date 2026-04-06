"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createAdminSession,
  getAdminSessionCookieName,
} from "@/lib/admin-session";
import { env } from "@/lib/env";

export type AdminLoginState = {
  status: "idle" | "error";
  message: string;
};

const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email."),
  password: z.string().trim().min(1, "Password is required."),
});

export async function loginAdmin(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const validatedFields = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Please enter a valid email and password.",
    };
  }

  if (
    validatedFields.data.email !== env.ADMIN_EMAIL ||
    validatedFields.data.password !== env.ADMIN_PASSWORD
  ) {
    return {
      status: "error",
      message: "Invalid admin credentials.",
    };
  }

  const sessionToken = await createAdminSession(validatedFields.data.email);
  const cookieStore = await cookies();

  cookieStore.set(getAdminSessionCookieName(), sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/admin/reservations");
}
