import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = (body.password || "").toString().trim();

  const envPass =
    process.env.ADMIN_PANEL_PASSWORD ||
    "Ozel2026!Panel";
  if (!envPass) {
    return NextResponse.json({ error: "Admin password not configured." }, { status: 500 });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const expected = crypto.createHash("sha256").update(envPass).digest("hex");

  if (hash !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  // set httpOnly cookie with the expected hash
  res.cookies.set({ name: "admin_auth", value: expected, httpOnly: true, path: "/", sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
