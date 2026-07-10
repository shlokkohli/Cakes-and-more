import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const pathname = request.nextUrl.pathname
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (
    session &&
    !session.user.onboardingCompleted &&
    pathname !== '/onboard'
  ) {
    return NextResponse.redirect(new URL('/onboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cart', '/profile'],
}
