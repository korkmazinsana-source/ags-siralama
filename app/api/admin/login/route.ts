import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = (body.password || "").toString().trim();

  // Fixed admin password check (exact match)
  if (password !== "05399505925") {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  // Set a simple admin flag cookie to indicate authenticated session
  const cookieValue = "ADMIN_AUTH_OK";
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: "admin_auth", value: cookieValue, httpOnly: true, path: "/", sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
