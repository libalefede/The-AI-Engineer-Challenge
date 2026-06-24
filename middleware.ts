import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, tokenFor } from "./utils/auth";

/**
 * Gate every page and the chat API behind a shared password.
 *
 * The gate is a no-op unless `APP_PASSWORD` is set, so local dev and the
 * initial deploy work without configuration; set the env var to switch it on.
 */
export async function middleware(req: NextRequest) {
  const password = process.env.APP_PASSWORD;
  if (!password) return NextResponse.next(); // gate disabled when unconfigured

  const expected = await tokenFor(password);
  const cookie = req.cookies.get(AUTH_COOKIE)?.value;
  if (cookie === expected) return NextResponse.next();

  // Not authenticated. API calls get a JSON 401; pages get redirected.
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      { detail: "Unauthorized — please log in." },
      { status: 401 }
    );
  }
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

// Run on everything except the login page, the auth endpoints, and static
// assets. This still covers /api/chat so the backend can't be used anonymously.
export const config = {
  matcher: ["/((?!login|auth|_next/static|_next/image|favicon.ico).*)"],
};
