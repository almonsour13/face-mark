// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: [
        // Protect these routes
        "/dashboard/:path*",
        "/event/:path*",
        "/attendance/:path*",
        "/profile/:path*",
        "/settings/:path*",
        // Add all your protected routes here

        // Exclude these from protection
        "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};