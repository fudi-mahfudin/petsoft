'use server';

import { signIn, signOut } from '@/lib/auth';
import { prismaDb } from '@/lib/db';
import { sleep } from '@/lib/utils';
import bcrypt from 'bcryptjs';
import { authSchema } from '@/lib/validations';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { AuthError } from 'next-auth';
import { Prisma } from '@prisma/client';

export async function logIn(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return { message: 'Invalid form data' };
  }
  await sleep(1000);
  try {
    await signIn('credentials', formData);
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    console.error(err);
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'AccessDenied':
          return { message: 'Access denied' };
        case 'CredentialsSignin':
          return { message: 'Invalid credentials' };
        default:
          return { message: 'Could not sign in' };
      }
    }

    return { message: 'Opss... Something went wrong in sign in' };
  }
}

export async function logOut() {
  await sleep(1000);
  await signOut({ redirectTo: '/' });
}

export async function signUp(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return { message: 'Invalid form data' };
  }

  // convert FormData to a plain object
  const credentials = Object.fromEntries(formData.entries());

  // validation
  const validatedFormData = authSchema.safeParse(credentials);
  if (!validatedFormData.success) {
    return { message: 'Invalid form data' };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  await sleep(1000);
  try {
    await prismaDb.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (err) {
    console.error(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2002':
          return { message: 'User already exists' };
        default:
          return { message: 'Could not create user' };
      }
    }
    return { message: 'Opss... Something went wrong in sign up' };
  }

  return await logIn(prevState, formData);
}
