import { loadStripe } from "@stripe/stripe-js";

/**
 * A Promise that resolves to a Stripe object, initialized with the publishable key
 * from the environment variables. This is used to interact with Stripe's API
 * for payment processing in the application.
 *
 * @remarks
 * The publishable key should be stored in the environment variable
 * `REACT_APP_STRIPE_PUBLISHABLE_KEY`. Make sure this key is valid and
 * corresponds to your Stripe account.
 *
 * @see {@link https://stripe.com/docs/js/initializing}
 */
export const stripePromise = loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
