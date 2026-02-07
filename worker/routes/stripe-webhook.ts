import Stripe from 'stripe';
import { Env } from '../env';
import { getStripe, webCrypto } from '../lib/stripe';
import { getSupabaseAdmin } from '../lib/supabase';
import { json } from '../lib/response';

export async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const sig = request.headers.get('stripe-signature');
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!sig || !webhookSecret) {
    console.error('Missing signature or webhook secret');
    return json({ error: 'Missing signature' }, 400);
  }

  const stripe = getStripe(env);
  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = await stripe.webhooks.constructEventAsync(
      body, sig, webhookSecret,
      undefined, webCrypto
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return json({ error: `Webhook Error: ${err.message}` }, 400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;

    if (!customerEmail) {
      console.error('No customer email in session');
      return json({ error: 'No customer email' }, 400);
    }

    console.log(`Processing payment for: ${customerEmail}`);

    try {
      const supabaseAdmin = getSupabaseAdmin(env);
      const { data: users, error: findError } =
        await (supabaseAdmin.auth as any).admin.listUsers();

      if (findError) {
        console.error('Error finding users:', findError);
        return json({ error: 'Error finding user' }, 500);
      }

      const user = users.users.find((u: any) => u.email === customerEmail);
      if (!user) {
        console.log(`User not found for email: ${customerEmail}. They may need to sign up first.`);
        return json({ message: 'User not found, purchase recorded' });
      }

      const { error: updateError } = await (supabaseAdmin.auth as any).admin.updateUserById(
        user.id,
        {
          app_metadata: {
            ...user.app_metadata,
            is_pro: true,
            stripe_customer_id: session.customer as string,
            pro_since: new Date().toISOString(),
          },
        }
      );

      if (updateError) {
        console.error('Error updating user:', updateError);
        return json({ error: 'Error updating user' }, 500);
      }

      console.log(`Successfully upgraded user ${user.id} to Pro`);
    } catch (err: any) {
      console.error('Error processing webhook:', err);
      return json({ error: 'Webhook processing error' }, 500);
    }
  }

  return json({ received: true });
}
