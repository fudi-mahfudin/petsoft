import NextAuth, { NextAuthConfig } from 'next-auth';
import { prismaDb } from './db';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const nextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = Boolean(auth);
      const isProtectedRoute = request.nextUrl.pathname.includes('/app');

      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }
      return true;
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
        console.log(credentials);
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

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

export const { auth, signIn } = NextAuth(nextAuthConfig);
