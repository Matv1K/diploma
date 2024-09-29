'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStripe, PaymentElement } from '@stripe/react-stripe-js';

import styles from './index.module.scss';

import { Button, Modal } from '@/components';

import { getTotalPrice } from '@/utils';

import { getCartItems } from '@/services/cart/cartService';
import { createOrder } from '@/services/orders/ordersService';

import { ButtonTypes } from '@/types';

const CheckoutForm: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const stripe = useStripe();
  const { push } = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      const { cartItems: items, totalPrice } = await getCartItems();

      setCartItems(items);
      setTotalPrice(totalPrice);
    };

    fetchCartItems();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  const handleConfirmCheckout = async () => {
    setIsProcessing(true);

    const totalPrice = getTotalPrice(cartItems);

    const orderItems = cartItems.map(({ _id, name, color, price, instrumentId, amount }) => ({
      _id,
      name,
      color,
      price,
      instrumentId,
      amount,
    }));

    try {
      await createOrder({ items: orderItems, totalPrice });

      push('/');
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setIsProcessing(false);
      setIsModalOpened(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleOpenModal();
  };

  return (
    <form className={styles.checkoutForm} onSubmit={handleSubmit}>
      <h2 className={styles.headingCheckout}>Checkout</h2>

      <PaymentElement />

      <Button type={ButtonTypes._BUTTON} onClick={handleOpenModal} className={styles.checkoutButton}>
        Pay {totalPrice}$
      </Button>

      {isModalOpened && (
        <Modal heading='Checkout' setIsModalOpened={setIsModalOpened}>
          <p className={styles.modalText}>Are you sure you want to proceed with the checkout?</p>

          <Button disabled={!stripe || isProcessing} className={styles.checkoutButton} onClick={handleConfirmCheckout}>
            {isProcessing ? 'Processing...' : `Pay ${totalPrice}$`}
          </Button>
        </Modal>
      )}
    </form>
  );
};

export default CheckoutForm;
