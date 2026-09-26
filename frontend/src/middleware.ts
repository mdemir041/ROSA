import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if authenticated user is trying to access login page
  if (pathname === '/admin-giris') {
    const hasAuthCookie = request.cookies.has('admin_auth');
    if (hasAuthCookie) {
      // Already logged in, redirect to dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // Check if the user is trying to access the admin area
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const hasAuthCookie = request.cookies.has('admin_auth');

    if (!hasAuthCookie) {
      // User is not authenticated, redirect to login page
      return NextResponse.redirect(new URL('/admin-giris', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin', '/admin-giris'],
};
