import { Env } from '../env';
import { getStripe } from '../lib/stripe';
import { json } from '../lib/response';

export async function handleCheckout(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const stripe = getStripe(env);
    const { email, origin } = await request.json() as { email?: string; origin: string };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AI Course Pro Access',
              description: 'Lifetime access to all 10 weeks of content, projects, and expert sessions.',
            },
            unit_amount: 1900,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payment?status=success`,
      cancel_url: `${origin}/payment?status=cancelled`,
      customer_email: email,
      metadata: {
        customer_email: email || '',
      },
    });

    return json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return json({ error: error.message }, 500);
  }
}
