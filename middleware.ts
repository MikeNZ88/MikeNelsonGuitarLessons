import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect specific duplicate pages to canonical versions
  const redirects: { [key: string]: string } = {
    '/policy.html': '/privacy-policy/',
    '/scale-explorer/index.html': '/scale-explorer/',
    '/blog/rhythm-tool': '/rhythm-tool/',
    '/blog/rhythm-tool/': '/rhythm-tool/',
  }

  // Check if current path should be redirected
  if (redirects[pathname]) {
    return NextResponse.redirect(new URL(redirects[pathname], request.url))
  }

  // Force trailing slash for all pages except homepage and specific files
  if (!pathname.endsWith('/') && 
      pathname !== '/' && 
      !pathname.includes('.') && 
      !pathname.includes('/api/')) {
    return NextResponse.redirect(new URL(pathname + '/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
} 