import Stripe from 'stripe';
import { Env } from '../env';

export const webCrypto = Stripe.createSubtleCryptoProvider();

export function getStripe(env: Env): Stripe {
  return new Stripe(env.STRIPE_SECRET_KEY.trim(), {
    apiVersion: '2025-11-17.clover',
    httpClient: Stripe.createFetchHttpClient(),
  });
}
