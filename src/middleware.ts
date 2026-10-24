import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';

  const token = request.cookies.get('token')?.value || '';

  // If the user is authenticated and tries to access login or signup, redirect to profile
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // If the user is NOT authenticated and tries to access a protected route, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile', '/login', '/signup','/verifyemail'],
};