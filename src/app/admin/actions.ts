"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminSessionCookieName } from "@/lib/admin-session";

export async function logoutAdmin() {
  const cookieStore = await cookies();

  cookieStore.delete(getAdminSessionCookieName());

  redirect("/admin/login");
}
