import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)

  const pathname = request.nextUrl.pathname

  // Protected routes that require authentication
  const protectedRoutes = ['/learn', '/profile']
  const adminRoutes = ['/admin']

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  if ((isProtectedRoute || isAdminRoute) && !user) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (isAdminRoute && user) {
    // Check admin role via user metadata
    const userMetadata = user.user_metadata
    const appMetadata = user.app_metadata
    const isAdmin =
      userMetadata?.role === 'admin' || appMetadata?.role === 'admin'

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
