import AuthForm from '@/components/auth-form';
import { H1 } from '@/components/typography';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="bg-custom-10 min-w-96 p-5 rounded-md shadow-sm">
      <H1 className="text-center">Sign Up</H1>
      <AuthForm variant="signup" />

      <p className="text-sm text-zinc-500 mt-10">
        Already have an account?{' '}
        <Link href="/login" className="font-medium">
          Log in
        </Link>
      </p>
    </main>
  );
}
