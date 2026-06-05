import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect CRM routes (should have valid session)
  if (pathname.startsWith('/crm')) {
    // TODO: Check session token
    // const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    // if (!token || !['ADMIN', 'AGENT', 'SUPER_ADMIN'].includes(token.role as string)) {
    //   return NextResponse.redirect(new URL('/auth/login', request.url))
    // }
  }

  // Rate limiting header (informational for now)
  const response = NextResponse.next()
  response.headers.set('X-Powered-By', 'Immo Vision 17')

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|videos|fonts).*)',
  ],
}
