'use client';

import { createCheckoutSession } from '@/actions/payment-action';
import { H1 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import stripeExample from '@/assets/stripe-example.jpg';

export default function PaymentPage({
  searchParams,
}: {
  searchParams: { success: string; cancelled: string };
}) {
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();

  const handleAccessClick = async () => {
    await update(true);
    router.push('/app/dashboard');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (searchParams.success) {
      interval = setInterval(() => {
        update(true);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [searchParams.success, update]);

  useEffect(() => {
    if (session?.user.hasAccess) {
      router.push('/app/dashboard');
    }
  }, [session?.user.hasAccess]);

  return (
    <main className="flex flex-col items-center gap-y-10">
      <H1>PetSoft access requires payment</H1>

      {searchParams.success ? (
        <Button
          onClick={handleAccessClick}
          disabled={status === 'loading' || session?.user.hasAccess}
        >
          Access PetSoft
        </Button>
      ) : (
        <Button
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              if (session?.user.hasAccess) {
                router.push('/app/dashboard');
              }
              await createCheckoutSession();
            })
          }
        >
          Buy lifetime access for $299
        </Button>
      )}

      {searchParams.success && (
        <p className="text-sm text-green-700">
          Payment successful! You now have lifetime access to PetSoft.
        </p>
      )}

      {searchParams.cancelled && (
        <p className="text-sm text-red-700">
          Payment cancelled. Please try again.
        </p>
      )}

      <Image
        src={stripeExample}
        alt="Stripe example"
        width={415}
        height={475}
      />
    </main>
  );
}
