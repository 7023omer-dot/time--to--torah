import { NextResponse, type NextRequest } from 'next/server'

// Phase 1: interface migration only — no auth/DB wiring yet.
// Supabase-based session/route protection will be re-enabled in Phase 3.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
