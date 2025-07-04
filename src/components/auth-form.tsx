'use client';

import { logIn, signUp } from '@/actions/auth-action';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useFormState } from 'react-dom';
import AuthFormButton from './auth-form-button';

export default function AuthForm({ variant }: { variant: 'login' | 'signup' }) {
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);
  const [signUpErr, dispatchSignUp] = useFormState(signUp, undefined);

  return (
    <form
      action={variant === 'signup' ? dispatchSignUp : dispatchLogIn}
      className="flex flex-col gap-y-5"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required maxLength={100} />
      </div>
      <div className="space-y-1 mb-5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          maxLength={100}
          minLength={5}
        />
      </div>

      <AuthFormButton>
        {variant === 'login' ? 'Log In' : 'Sign Up'}
      </AuthFormButton>
      {logInError && <p className="text-red-500">{logInError.message}</p>}
      {signUpErr && <p className="text-red-500">{signUpErr.message}</p>}
    </form>
  );
}
