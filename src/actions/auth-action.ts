'use server';

import { signIn } from '@/lib/auth';

export async function logIn(formData: FormData) {
  try {
    await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    });
  } catch (error) {
    console.log(error);
    // return { error: 'Failed to log in' };
  }
}
