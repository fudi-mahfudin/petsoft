'use client';

import { logIn, signUp } from '@/actions/auth-action';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useFormState } from 'react-dom';
import AuthFormButton from './auth-form-button';
import { useEffect, useRef } from 'react';

export default function AuthForm({ variant }: { variant: 'login' | 'signup' }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);
  const [signUpErr, dispatchSignUp] = useFormState(signUp, undefined);

  useEffect(() => {
    inputRef.current?.focus();
  }, [logInError, signUpErr]);

  return (
    <form
      action={variant === 'signup' ? dispatchSignUp : dispatchLogIn}
      className="flex flex-col gap-y-5"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          ref={inputRef}
          id="email"
          name="email"
          type="email"
          defaultValue={variant === 'login' ? 'user@example.com' : ''}
          required
          maxLength={100}
        />
      </div>
      <div className="space-y-1 mb-5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={variant === 'login' ? 'password' : ''}
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
