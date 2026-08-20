import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.toLowerCase();
  const isIcon =
    path === "/favicon.ico" ||
    path === "/icon" ||
    path.startsWith("/favicon") ||
    path.startsWith("/apple-icon") ||
    path.startsWith("/apple-touch-icon") ||
    path.includes("cropped_circle");

  if (isIcon) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/favicon.ico",
    "/favicon.png",
    "/favicon-:path*",
    "/apple-touch-icon",
    "/apple-touch-icon:path*",
    "/apple-icon",
    "/apple-icon:path*",
    "/icon",
    "/cropped_circle_image.png",
  ],
};
