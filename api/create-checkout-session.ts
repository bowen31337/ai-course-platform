import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Trim the API key to remove any accidental whitespace/newlines
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY?.trim() || '', {
    apiVersion: '2025-11-17.clover',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, origin } = req.body as { email?: string; origin: string };

        // Create Checkout Session with dynamic success/cancel URLs
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
                        unit_amount: 1900, // $19.00 in cents
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

        return res.status(200).json({ url: session.url });
    } catch (error: any) {
        console.error('Error creating checkout session:', error);
        return res.status(500).json({ error: error.message });
    }
}
