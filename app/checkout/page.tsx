"use client";

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import stripePromise from "@/config/stripe";
import styles from "./page.module.scss";
import { Button } from "@/components";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message || "Payment error");
      } else {
        console.log("Payment successful!", paymentMethod);
        setErrorMessage(null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <h2>Checkout</h2>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <div className={styles.cardDetails}>
        <label htmlFor="card">Card Details</label>
        <CardElement
          options={{
            style: {
              base: {
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
            },
          }}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button type="submit">Submit Payment</Button>
      </div>
    </form>
  );
};

const Checkout: React.FC = () => {
  return (
    <main>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </main>
  );
};

export default Checkout;
