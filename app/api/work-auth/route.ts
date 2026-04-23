import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE = "portfolio-auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const expected = process.env.PORTFOLIO_PASSWORD ?? "martina2026";

  if (password !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return NextResponse.json({ ok: true });
}
