import { NextAuthConfig } from 'next-auth';
import { prismaDb } from './db';

export const nextAuthEdgeConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = !!auth?.user;
      const urlTarget = request.nextUrl.pathname;
      const isProtectedRoute = urlTarget.includes('/app');

      if (isLoggedIn) {
        if (!auth.user.hasAccess) {
          if (request.url.includes('/payment')) {
            return true;
          }
          return Response.redirect(new URL('/payment', request.nextUrl));
        }

        if (
          urlTarget.includes('/login') ||
          urlTarget.includes('/signup') ||
          urlTarget.includes('/payment')
        ) {
          return Response.redirect(new URL('/app/dashboard', request.nextUrl));
        }

        return true;
      }
      if (!isProtectedRoute) {
        return true;
      }

      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        // on sign in
        token.userId = user.id;
        token.email = user.email;
        token.hasAccess = user.hasAccess;
      }

      if (trigger === 'update') {
        // on every success payment page
        const userFromDb = await prismaDb.user.findUnique({
          where: { email: token.email },
        });
        if (userFromDb) {
          token.hasAccess = userFromDb.hasAccess;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.userId;
      session.user.hasAccess = token.hasAccess;

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
