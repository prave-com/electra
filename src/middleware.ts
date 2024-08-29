import authConfig from '@/auth.config'
import {
  administratorRoutePrefix,
  apiAuthPrefix,
  authRoutes,
  operatorRoutePrefix,
  publicRoutes,
} from '@/routes'
import { Role } from '@prisma/client'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isAdministratorRoute = nextUrl.pathname.startsWith(
    administratorRoutePrefix,
  )
  const isOperatorRoute = nextUrl.pathname.startsWith(operatorRoutePrefix)

  const isAdministrator = req.auth?.user.role === Role.ADMINISTRATOR
  const isOperator = req.auth?.user.role === Role.OPERATOR
  const isGuest = req.auth?.user.role === Role.GUEST

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (isLoggedIn && isAdministrator) {
      return Response.redirect(new URL(administratorRoutePrefix, nextUrl))
    }

    if (isLoggedIn && isOperator) {
      return Response.redirect(new URL(operatorRoutePrefix, nextUrl))
    }

    if (isLoggedIn && isGuest) {
      return Response.redirect(new URL('/', nextUrl))
    }

    return
  }

  if (isLoggedIn) {
    if (isAdministratorRoute && !isAdministrator) {
      return Response.redirect(new URL('/signin', nextUrl))
    }

    if (isOperatorRoute && !isOperator) {
      return Response.redirect(new URL(`/signin`, nextUrl))
    }

    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname

    if (nextUrl.search) callbackUrl += nextUrl.search

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    )
  }

  return
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
}
