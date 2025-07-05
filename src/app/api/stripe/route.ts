import { prismaDb } from '@/lib/db';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") as string;

  // verify webhook came from Stripe
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: 'Webhook verification failed' },
      { status: 400 }
    );
  }

  // handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      await prismaDb.user.update({
        where: { email: session.customer_email as string },
        data: { hasAccess: true },
      });
      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return Response.json({ received: true });
}
