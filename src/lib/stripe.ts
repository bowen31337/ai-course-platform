// Stripe configuration for the AI Course Platform
// Using Stripe Payment Links for simple checkout (no backend required)

export const STRIPE_CONFIG = {
    // Test mode payment link - replace with your actual payment link from Stripe Dashboard
    // Create one at: https://dashboard.stripe.com/payment-links
    paymentLink: 'https://buy.stripe.com/test_bJe14gedl3Ld0iOeDv0Fi00',

    // Publishable key for client-side Stripe.js (if needed later)
    publishableKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',

    // Product configuration
    product: {
        name: 'AI Course Pro Access',
        price: 4900, // $49.00 in cents
        currency: 'usd',
    },

    // Success/Cancel URLs - must match PaymentResultPage route and query params
    successUrl: `${window.location.origin}/payment?status=success`,
    cancelUrl: `${window.location.origin}/payment?status=cancelled`,
};

// Helper function to redirect to Stripe checkout
export function redirectToCheckout(userEmail?: string) {
    // For now, use payment link (simplest approach, no backend needed)
    // Later can upgrade to Stripe Checkout Sessions with a backend
    const paymentUrl = new URL(STRIPE_CONFIG.paymentLink);
    paymentUrl.searchParams.set('success_url', STRIPE_CONFIG.successUrl);
    paymentUrl.searchParams.set('cancel_url', STRIPE_CONFIG.cancelUrl);

    // Pre-fill customer email if provided
    if (userEmail) {
        paymentUrl.searchParams.set('prefilled_email', userEmail);
    }

    window.location.href = paymentUrl.toString();
}
