// Shared auth helpers used by both the Edge middleware and the Node route
// handlers. The login gate is a simple shared-password scheme:
//
//   - `APP_PASSWORD` is the password users type on /login.
//   - On success we set an httpOnly cookie whose value is sha256(APP_PASSWORD).
//   - Middleware recomputes that hash and compares — the cookie can't be
//     forged without knowing the password, and the password never reaches
//     the browser.
//
// The gate is only active when APP_PASSWORD is set, so local dev works
// out-of-the-box and you opt in by setting the env var.

export const AUTH_COOKIE = "auth";

/** Deterministic, unforgeable token derived from the shared password. */
export async function tokenFor(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
