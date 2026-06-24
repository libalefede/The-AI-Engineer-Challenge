import { NextResponse } from "next/server";
import { AUTH_COOKIE, tokenFor } from "@/utils/auth";

// POST /auth/login  { password }  ->  sets the auth cookie on success.
export async function POST(req: Request) {
  const password = process.env.APP_PASSWORD;

  // Gate disabled: nothing to check, don't strand the user on /login.
  if (!password) return NextResponse.json({ ok: true });

  let submitted = "";
  try {
    const body = await req.json();
    submitted = typeof body?.password === "string" ? body.password : "";
  } catch {
    // fall through to the mismatch response
  }

  if (submitted !== password) {
    return NextResponse.json({ detail: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, await tokenFor(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
