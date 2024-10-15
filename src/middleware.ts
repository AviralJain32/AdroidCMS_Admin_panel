import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If the user is logged in and tries to access the sign-in, sign-up, or verify routes, allow access
  if (token  && url.pathname.startsWith('/sign-in')) {
    // If user is logged in and tries to access protected admin routes like /conferences or /users, allow access
    return NextResponse.redirect(new URL("/conferences", request.url));
  }

  // If the user is not logged in and trying to access protected admin routes
  if (!token && (url.pathname.startsWith('/conferences') || url.pathname.startsWith('/users'))) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow request to proceed if all checks pass
  return NextResponse.next();
}

// Specify the routes for middleware to apply
export const config = {
  matcher: ['/conferences/:path*', '/users/:path*'],
};
