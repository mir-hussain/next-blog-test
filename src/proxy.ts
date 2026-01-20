import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";

const publicRoutes = [
  "/login",
  "/register",
  "/verify-email",
  "/pending-verification",
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  let userRole: string | null = null;
  let isAuthenticated = false;

  const session = await userService.getUser();

  if (session?.user) {
    isAuthenticated = true;
    userRole = session.user.role;
  }

  const isAdmin = userRole === "ADMIN";

  const isPublic =
    pathname === "/" || publicRoutes.some((r) => pathname.startsWith(r));

  if (!isPublic && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthenticated && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", req.url));
  }

  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard",
    "/admin-dashboard/:path*",
    "/admin-dashboard",
    "/login",
    "/signup",
  ],
};
