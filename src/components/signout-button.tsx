'use client';

import { Button } from '@/components/ui/button';
import { logOut } from '@/actions/auth-action';
import { useTransition } from 'react';

export default function SignoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={async () => startTransition(async () => await logOut())}
      disabled={isPending}
      className="rounded-full"
    >
      {isPending ? 'Signing out...' : 'Sign out'}
    </Button>
  );
}
