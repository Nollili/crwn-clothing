import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { FormContainer } from './payment-form.styles';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentButton, PaymentFormContainer } from './payment-form.styles';
import { StripeCardElement } from '@stripe/stripe-js';

// Type for the current user object
type CurrentUser = {
  displayName: string;
  // Add other user properties if needed
};

// Type guard to check if the card element is a valid StripeCardElement (not null)
// This helps TypeScript know that card is not null after this check
const ifValidCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;

// PaymentForm component handles Stripe payment processing
const PaymentForm = () => {
  // Stripe instance for payment processing
  const stripe = useStripe();
  // Elements instance to access form elements like CardElement
  const elements = useElements();
  // Total amount in the cart (number)
  const amount = useSelector(selectCartTotal);
  // Current user object or null
  const currentUser = useSelector(selectCurrentUser) as CurrentUser | null;
  // State to indicate if payment is being processed
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Handles form submission and payment processing
  const paymentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure Stripe and Elements are loaded
    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    // Call backend to create a payment intent
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }), // Stripe expects amount in cents
    }).then((res) => {
      return res.json();
    });

    // Get client secret from payment intent
    const clientSecret = response.paymentIntent.client_secret;

    const cardDetails = elements.getElement(CardElement);

    if (!ifValidCardElement(cardDetails)) {
      setIsProcessingPayment(false);
      return;
    }

    // Confirm card payment with Stripe
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardDetails, // CardElement instance (never null here)
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Lili', // Use user's name or fallback
        },
      },
    });

    setIsProcessingPayment(false);

    // Handle payment result
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful!');
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        {/* Stripe CardElement for card input */}
        <CardElement />
        <PaymentButton
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          isLoading={isProcessingPayment}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;