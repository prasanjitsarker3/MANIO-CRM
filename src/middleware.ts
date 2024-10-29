/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const AuthRoutes = ["/"];
const roleBasePrivateRoute = {
  user: [/^\/user/],
  admin: [/^\/admin/, /^\/user/],
};

type Role = keyof typeof roleBasePrivateRoute;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  let decodedData: any = null;
  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role: Role | undefined = decodedData?.role;
  if (accessToken && AuthRoutes.includes(pathname)) {
    if (role && roleBasePrivateRoute[role]) {
      const redirectTo =
        role === "admin" ? "/admin" : role === "user" ? "/user" : "/";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  let previousValidRoute: string | null = null;
  if (role && roleBasePrivateRoute[role]) {
    const routes = roleBasePrivateRoute[role];
    if (routes.some((route) => route.test(pathname))) {
      previousValidRoute = pathname;
      return NextResponse.next();
    } else {
      if (previousValidRoute) {
        return NextResponse.redirect(new URL(previousValidRoute, request.url));
      } else {
        const fallbackRoute =
          role === "admin" ? "/admin" : role === "user" ? "/user" : "/";
        return NextResponse.redirect(new URL(fallbackRoute, request.url));
      }
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
