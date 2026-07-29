import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = (body.password || "").toString().trim();

  // Successful login if password exactly matches this fixed admin password
  if (password !== "05399505925") {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  // Preserve existing cookie mechanism: set cookie value to the hash of the server secret
  const cookieSecret = "Ozel2026!Panel";
  const expected = crypto.createHash("sha256").update(cookieSecret).digest("hex");

  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: "admin_auth", value: expected, httpOnly: true, path: "/", sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
