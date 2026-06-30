import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME ?? 'naelvi_admin'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect all /admin/* except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get(COOKIE_NAME)?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const payload = await verifyToken(token)

    if (!payload) {
      // Token invalid/expired → clear cookie and redirect
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete(COOKIE_NAME)
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
