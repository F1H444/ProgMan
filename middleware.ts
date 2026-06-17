import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { rateLimit } from '@/lib/rate-limit'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-super-secret-key-change-this-in-production';
const KEY = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  // 1. Rate Limiting
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown-ip';
  const rateLimitResult = rateLimit(ip, { limit: 100, windowMs: 60 * 1000 }); // 100 request per menit per IP
  
  if (!rateLimitResult.success) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // Khusus untuk rute login admin, berikan rate limit lebih ketat (brute force protection)
  const isLoginRoute = request.nextUrl.pathname === '/admin/login';
  if (isLoginRoute && request.method === 'POST') {
    const loginRateLimit = rateLimit(`${ip}-login`, { limit: 5, windowMs: 15 * 60 * 1000 }); // 5 percobaan per 15 menit
    if (!loginRateLimit.success) {
      return new NextResponse('Too Many Login Attempts. Please try again later.', { status: 429 });
    }
  }

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
  
  if (isAdminRoute && !isLoginRoute && !user) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
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

