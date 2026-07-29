import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: "admin_auth", value: "", httpOnly: true, path: "/", sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 0 });
  return res;
}
