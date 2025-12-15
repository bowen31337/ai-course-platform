// Stripe configuration for the AI Course Platform
// Using Stripe Checkout Sessions for dynamic redirect URLs

export const STRIPE_CONFIG = {
    // Publishable key for client-side Stripe.js (if needed later)
    publishableKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',

    // Product configuration
    product: {
        name: 'AI Course Pro Access',
        price: 1900, // $19.00 in cents
        currency: 'usd',
    },
};

// Helper function to redirect to Stripe checkout
export async function redirectToCheckout(userEmail?: string) {
    try {
        // Call our API to create a Checkout Session
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail,
                origin: window.location.origin,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to create checkout session');
        }

        // Redirect to Stripe Checkout
        if (data.url) {
            window.location.href = data.url;
        } else {
            throw new Error('No checkout URL returned');
        }
    } catch (error) {
        console.error('Error redirecting to checkout:', error);
        alert('Failed to start checkout. Please try again.');
    }
}

