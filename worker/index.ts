import { Env } from './env';
import { handleCheckout } from './routes/checkout';
import { handleProgress } from './routes/progress';
import { handleStripeWebhook } from './routes/stripe-webhook';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/create-checkout-session') {
      return handleCheckout(request, env);
    }
    if (path === '/api/progress') {
      return handleProgress(request, env);
    }
    if (path === '/api/webhooks/stripe') {
      return handleStripeWebhook(request, env);
    }

    if (path.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
