import AuthForm from '@/components/auth-form';
import { H1 } from '@/components/typography';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="bg-custom-10 min-w-96 p-5 rounded-md shadow-sm">
      <H1 className="text-center">Log In</H1>
      <AuthForm variant="login" />

      <p className="text-sm text-zinc-500 mt-10">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-medium">
          Sign up
        </Link>
      </p>
    </main>
  );
}
