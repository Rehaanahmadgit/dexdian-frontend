import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ─── Constants ───────────────────────────────────────────

const PUBLIC_PATHS = ['/login'];
const AUTH_COOKIE = 'accessToken';
const DEFAULT_REDIRECT = '/home';

// ─── Middleware ──────────────────────────────────────────

export default function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  // Allow Next.js internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // ── Public Paths (login) ──────────────────────────
  const isPublicPath = PUBLIC_PATHS.some((p) => pathname === p);

  if (isPublicPath) {
    // Already logged in → go to dashboard
    if (token) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.url));
    }
    return NextResponse.next();
  }

  // ── Protected Paths ───────────────────────────────
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// ─── Matcher ─────────────────────────────────────────────

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
