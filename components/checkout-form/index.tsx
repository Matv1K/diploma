"use client";

import React from "react";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import styles from "./index.module.scss";

import { Button } from "@/components";

import { ButtonTypes } from "@/types";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <h2 className={styles.headingCheckout}>Checkout</h2>

      <PaymentElement />

      <Button
        disabled={!stripe}
        className={styles.checkoutButton}
        type={ButtonTypes.SUBMIT}
      >
        Pay 2000$
      </Button>
    </form>
  );
};

export default CheckoutForm;
