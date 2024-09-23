'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useStripe, PaymentElement } from '@stripe/react-stripe-js';

import styles from './index.module.scss';

import { Button } from '@/components';

import { getTotalPrice } from '@/utils';

import { getCartItems } from '@/services/cart/cartService';
import { createOrder } from '@/services/orders/ordersService';

import { ButtonTypes } from '@/types';

const CheckoutForm: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { push } = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      const { cartItems: items, totalPrice } = await getCartItems();

      setCartItems(items);
      setTotalPrice(totalPrice);
    };

    fetchCartItems();
  }, []);

  const stripe = useStripe();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const totalPrice = getTotalPrice(cartItems);

    const orderItems = cartItems.map(({ _id, name, color, price, instrumentId, amount }) => ({
      _id,
      name,
      color,
      price,
      instrumentId,
      amount,
    }));

    await createOrder({ items: orderItems, totalPrice });

    push('/');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <h2 className={styles.headingCheckout}>Checkout</h2>

      <PaymentElement />

      <Button disabled={!stripe} className={styles.checkoutButton} type={ButtonTypes._SUBMIT}>
        Pay {totalPrice}$
      </Button>
    </form>
  );
};

export default CheckoutForm;
