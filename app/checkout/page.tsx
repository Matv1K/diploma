"use client";

import React from "react";

import stripePromise from "@/config/useStripeConfig";

import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "@/components";

import { convertToSubcurrency } from "@/utils";

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
