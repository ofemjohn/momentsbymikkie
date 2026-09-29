import { NextResponse } from "next/server";
import { SESSION_COOKIE, createSessionToken } from "@/lib/session";
import { ADMIN_PASSWORD, ADMIN_SESSION_SECRET } from "@/lib/admin-config";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (typeof password !== "string" || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createSessionToken(ADMIN_SESSION_SECRET);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
