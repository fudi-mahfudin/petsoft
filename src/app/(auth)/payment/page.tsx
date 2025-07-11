'use client';

import { createCheckoutSession } from '@/actions/payment-action';
import { H1 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useTransition } from 'react';
import stripeExample from '@/assets/stripe-example.jpg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BadgeCheckIcon, DogIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentPage({
  searchParams,
}: {
  searchParams: { success: string; cancelled: string };
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session, update } = useSession();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (searchParams.success && !session?.user.hasAccess) {
      interval = setInterval(() => {
        update(true);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [searchParams.success, update, session?.user.hasAccess]);

  const handleClick = () => {
    startTransition(async () => {
      const checkoutUrl = await createCheckoutSession();

      if (checkoutUrl) {
        router.push(checkoutUrl);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <main className="flex flex-col items-center gap-y-10">
      <H1>PetSoft access requires payment</H1>

      {searchParams.cancelled && (
        <p className="text-lg text-red-700">
          Payment cancelled. Please try again.
        </p>
      )}

      {searchParams.success && !session?.user.hasAccess && (
        <>
          <DogIcon className="w-10 h-10 text-zinc-500 animate-spin duration-1000" />
          <p className="text-lg text-zinc-500">Waiting for payment confirmation...</p>
        </>
      )}

      {searchParams.success && session?.user.hasAccess && (
        <>
          <BadgeCheckIcon className="w-10 h-10 text-green-700" />
          <p className="text-lg text-green-700">
            Payment successful! You now have lifetime access to PetSoft.
          </p>
          <Button asChild>
            <Link href="/app/dashboard">Access PetSoft</Link>
          </Button>
        </>
      )}

      {!searchParams.success && (
        <>
          <Button disabled={isPending} onClick={handleClick}>
            {isPending ? 'Processing...' : 'Buy lifetime access for $299'}
          </Button>
          <Accordion type="single" collapsible className="w-[415px] h-[400px]">
            <AccordionItem value="item-1">
              <AccordionTrigger className="border-b border-light">
                Payment Example
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <Image src={stripeExample} alt="Stripe example" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </main>
  );
}
