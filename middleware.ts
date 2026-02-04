import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("token")?.value;
	const pathname = req.nextUrl.pathname;

	const isDashboardRoute = pathname.startsWith("/dashboard");

	const isAuthRoute =
		pathname.startsWith("/login") || pathname.startsWith("/register");

	if (!token && isDashboardRoute) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	if (token && isAuthRoute) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/login", "/register"],
};
