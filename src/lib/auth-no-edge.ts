import NextAuth, { NextAuthConfig } from 'next-auth';
import { prismaDb } from './db';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { authSchema } from './validations';
import { nextAuthEdgeConfig } from './auth-edge';

export const config = {
  ...nextAuthEdgeConfig,
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

        // database query
        const { email, password } = validatedCredentials.data;
        const user = await prismaDb.user.findUnique({
          where: { email },
        });
        if (!user) {
          console.log('No user found');
          return null;
        }

        // password check
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

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
