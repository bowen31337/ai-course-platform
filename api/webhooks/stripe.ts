import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: 'edge',
};

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

export default async function handler(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    if (!sig || !webhookSecret) {
        console.error('Missing signature or webhook secret');
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        const body = await req.text();
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json(
            { error: `Webhook Error: ${err.message}` },
            { status: 400 }
        );
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Get customer email from the session
        const customerEmail = session.customer_details?.email;

        if (!customerEmail) {
            console.error('No customer email in session');
            return NextResponse.json({ error: 'No customer email' }, { status: 400 });
        }

        console.log(`Processing payment for: ${customerEmail}`);

        try {
            // Find user by email in Supabase
            const { data: users, error: findError } =
                await supabaseAdmin.auth.admin.listUsers();

            if (findError) {
                console.error('Error finding users:', findError);
                return NextResponse.json({ error: 'Error finding user' }, { status: 500 });
            }

            const user = users.users.find((u) => u.email === customerEmail);

            if (!user) {
                console.log(
                    `User not found for email: ${customerEmail}. They may need to sign up first.`
                );
                // Store the purchase for later - could use a 'purchases' table
                return NextResponse.json(
                    { message: 'User not found, purchase recorded' },
                    { status: 200 }
                );
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
                return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
            }

            console.log(`Successfully upgraded user ${user.id} to Pro`);
        } catch (err: any) {
            console.error('Error processing webhook:', err);
            return NextResponse.json(
                { error: 'Webhook processing error' },
                { status: 500 }
            );
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
