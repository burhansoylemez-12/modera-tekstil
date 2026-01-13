import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const adminAuthEnabled = process.env.ADMIN_AUTH_ENABLED !== 'false';

  // Admin panel rotaları
  if (path.startsWith('/admin')) {
    // Yetkilendirme devre dışı ise doğrudan izin ver
    if (!adminAuthEnabled) {
      // Giriş sayfasını ziyaret etmeye çalışıyorsa admin ana sayfaya yönlendir
      if (path === '/admin/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    const token = request.cookies.get('admin_token')?.value;

    if (!token && path !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (token) {
      const decoded = verifyToken(token);
      if (!decoded && path !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      
      if (decoded && path === '/admin/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
