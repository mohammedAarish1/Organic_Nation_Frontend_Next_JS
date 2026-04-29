import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for auth token in cookies (set by your Express backend)
  const token =
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("refreshToken")?.value;
  // If user is authenticated and trying to access login page
  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is NOT authenticated and trying to access protected routes
  if (!token && request.nextUrl.pathname.startsWith("/orders")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/orders/:path*"], // Add other protected routes
};
