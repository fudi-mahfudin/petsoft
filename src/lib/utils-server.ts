import 'server-only';
import { auth } from './auth-no-edge';
import { redirect } from 'next/navigation';

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  return session;
}
