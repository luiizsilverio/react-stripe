import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripeTextPromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTextPromise}>
      <PaymentForm />
    </Elements>
  )
}