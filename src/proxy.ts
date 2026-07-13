import { NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // State 1: Logged out user -> can view all pages except cart and profile
  if (!session) {
    const protectedRoutes = [
      '/onboard',
      '/profile',
      '/cart',
    ]
    if (protectedRoutes.includes(pathname)) {
      return NextResponse.redirect(
        new URL('/verify', request.url)
      )
    }
    return NextResponse.next()
  }

  // State 2: Inbetween of onboarding -> cannot skip /onboard if /auth and /verify are completed
  if (
    session &&
    !session.user.onboardingCompleted &&
    pathname !== '/onboard'
  ) {
    return NextResponse.redirect(
      new URL('/onboard', request.url)
    )
  }

  // State 3: Logged in user -> Cannot view /onboard, /verify and /auth routes
  if (session && session.user.onboardingCompleted) {
    const authRoutes = ['/auth', '/verify', '/onboard']
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(
        new URL('/', request.url)
      )
    }
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
