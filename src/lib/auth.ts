import NextAuth, { NextAuthConfig } from 'next-auth';
import { prismaDb } from './db';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { authSchema } from './validations';

export const nextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = Boolean(auth);
      const urlTarget = request.nextUrl.pathname;
      const isProtectedRoute = urlTarget.includes('/app');

      if (isLoggedIn) {
        // if (!auth?.user?.hasAccess) { /payment }
        if (urlTarget.includes('/login') || urlTarget.includes('/signup')) {
          return Response.redirect(new URL('/app/dashboard', request.nextUrl));
        }
        return true;
      }
      if (!isProtectedRoute) {
        return true;
      }

      return false;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        // on sign in
        token.userId = user.id;
        token.email = user.email;
        token.hasAccess = user.hasAccess;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.userId;
      session.user.hasAccess = token.hasAccess;

      return session;
    },
  },
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // runs on login
        // validation
        const validatedCredentials = authSchema.safeParse(credentials);
        if (!validatedCredentials.success) {
          console.log('Validation failed');
          return null;
        }
        const { email, password } = validatedCredentials.data;

        const user = await prismaDb.user.findUnique({
          where: { email },
        });
        if (!user) {
          console.log('No user found');
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordsMatch) {
          console.log('Passwords do not match');
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(nextAuthConfig);
