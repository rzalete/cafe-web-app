import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "cafe-admin-session";

type AdminSessionPayload = {
  adminEmail: string;
};

function getSessionSecret() {
  const sessionSecret = process.env.SESSION_SECRET;

  if (!sessionSecret) {
    throw new Error("SESSION_SECRET is not set.");
  }

  return new TextEncoder().encode(sessionSecret);
}

export async function createAdminSession(adminEmail: string) {
  const secret = getSessionSecret();

  return new SignJWT({ adminEmail })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);
}

export async function verifyAdminSession(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    const secret = getSessionSecret();
    const { payload } = await jwtVerify<AdminSessionPayload>(token, secret);

    if (!payload.adminEmail) {
      return null;
    }

    return {
      adminEmail: payload.adminEmail,
    };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  return verifyAdminSession(sessionToken);
}

export async function requireAdminSession() {
  const adminSession = await getAdminSession();

  if (!adminSession) {
    redirect("/admin/login");
  }

  return adminSession;
}

export async function redirectIfAdminSessionExists() {
  const adminSession = await getAdminSession();

  if (adminSession) {
    redirect("/admin/reservations");
  }
}

export function getAdminSessionCookieName() {
  return SESSION_COOKIE_NAME;
}
