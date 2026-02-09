import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import redirects from "./redirects"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if path matches any redirect rule
  const targetUrl = redirects[pathname as keyof typeof redirects]

  if (targetUrl) {
    const url = request.nextUrl.clone()
    url.pathname = targetUrl
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except for
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder files
    "/((?!_next/static|_next/image|favicon.ico|opengraph-image|apple-icon|icon|manifest|.*\\..*).*)",
  ],
}
