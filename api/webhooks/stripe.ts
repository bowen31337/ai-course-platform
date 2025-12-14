import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover',
});

// Initialize Supabase Admin Client
const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    if (!sig || !webhookSecret) {
        console.error('Missing signature or webhook secret');
        return res.status(400).json({ error: 'Missing signature' });
    }

    let event: Stripe.Event;

    try {
        // Vercel sends raw body as string/buffer
        const rawBody = req.body;
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Get customer email from the session
        const customerEmail = session.customer_details?.email;

        if (!customerEmail) {
            console.error('No customer email in session');
            return res.status(400).json({ error: 'No customer email' });
        }

        console.log(`Processing payment for: ${customerEmail}`);

        try {
            // Find user by email in Supabase
            const { data: users, error: findError } =
                await supabaseAdmin.auth.admin.listUsers();

            if (findError) {
                console.error('Error finding users:', findError);
                return res.status(500).json({ error: 'Error finding user' });
            }

            const user = users.users.find((u) => u.email === customerEmail);

            if (!user) {
                console.log(
                    `User not found for email: ${customerEmail}. They may need to sign up first.`
                );
                return res.status(200).json({ message: 'User not found, purchase recorded' });
            }

            // Update user's app_metadata to mark as Pro
            const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
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
                return res.status(500).json({ error: 'Error updating user' });
            }

            console.log(`Successfully upgraded user ${user.id} to Pro`);
        } catch (err: any) {
            console.error('Error processing webhook:', err);
            return res.status(500).json({ error: 'Webhook processing error' });
        }
    }

    return res.status(200).json({ received: true });
}

// Disable body parsing so we can verify webhook signature
export const config = {
    api: {
        bodyParser: false,
    },
};
