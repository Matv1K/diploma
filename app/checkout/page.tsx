"use client";

import React, { useState } from "react";

import { Elements } from "@stripe/react-stripe-js";

import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import stripePromise from "@/config/useStripeConfig";

import styles from "./page.module.scss";

import { Button } from "@/components";

const convertToSubcurrency = (amount: number, factor = 100) => {
  return Math.round(amount * factor);
};

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <h2>Checkout</h2>

      <PaymentElement />

      <Button
        disabled={!stripe}
        className={styles.checkoutButton}
        type="submit"
      >
        Pay 2000$
      </Button>
    </form>
  );
};

const Checkout: React.FC = () => {
  return (
    <main>
      <Elements
        options={{
          mode: "payment",
          currency: "usd",
          amount: convertToSubcurrency(49.9),
        }}
        stripe={stripePromise}
      >
        <CheckoutForm />
      </Elements>
    </main>
  );
};

export default Checkout;
