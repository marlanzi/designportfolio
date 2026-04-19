import { NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/work"];
const LOGIN_PATH = "/work/login";
const COOKIE = "portfolio-auth";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected =
    PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/")) &&
    pathname !== LOGIN_PATH;

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get(COOKIE)?.value;
  const expected = process.env.PORTFOLIO_PASSWORD ?? "martina2025";

  if (token === expected) return NextResponse.next();

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = LOGIN_PATH;
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/work", "/work/:path*"],
};
