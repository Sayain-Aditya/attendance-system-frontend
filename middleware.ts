import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt } from "./lib/session";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("session")?.value;
  const session = await decrypt(cookie);
  console.log(session);

  const homePage = request.nextUrl.pathname === "/";
  if (homePage && !cookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const isAuthPage = request.nextUrl.pathname === "/sign-in";

  const isProtected =
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/employee");

  // If trying to visit auth while logged in → redirect to dashboard
  if (cookie) {
    if (isAuthPage || homePage) {
      if (session?.role === "Employee") {
        return NextResponse.redirect(new URL("/employee", request.url));
      } else {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      session?.role !== "Admin"
    ) {
      return NextResponse.redirect(new URL("/employee", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/employee") &&
      session?.role !== "Employee"
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // If visiting protected route without auth → redirect to login
  if (isProtected && !cookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
