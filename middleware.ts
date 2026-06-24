import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-super-secret-key-change-this-in-production';
const KEY = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Authentication & Authorization
  const adminSession = request.cookies.get('admin_session')?.value;
  let user = null;

  if (adminSession) {
    try {
      const { payload } = await jwtVerify(adminSession, KEY, {
        algorithms: ['HS256'],
      });
      user = payload;
    } catch (error) {
      // Token invalid atau expired
      // Sengaja tidak dilempar error agar user dialihkan ke halaman login
    }
  }

const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/admin/login';

  if (isAdminRoute && !isLoginRoute && !user) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Catatan: Header keamanan di-set via next.config.ts untuk menghindari duplikasi
  // yang bisa menyebabkan bug atau parsing yang lambat oleh browser.

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

