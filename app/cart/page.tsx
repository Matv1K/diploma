'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './page.module.scss';

import Link from 'next/link';
import { InstrumentRow, Button } from '@/components';

import { fetchCartItems } from '@/features/instruments/instrumentsSlice';

import { CartItemWithIdI } from '@/types';
import { RootState, AppDispatch } from '@/app/store';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.instruments.cartItems) || [];

  const totalPrice = Array.isArray(cartItems) ?
    cartItems.reduce((total, item) => total + Number(item.price.slice(0, -1)) * item.amount, 0): 0;
  const totalItems = Array.isArray(cartItems) ? cartItems.length : 0;

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  if (cartItems?.length === 0) {
    return (
      <main className={styles.containerEmpty}>
        <h2>Your cart is empty</h2>

        <Link href='/shop'>
          <Button>Go back to shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h2>Your Cart</h2>

      <div className={styles.cartLayout}>
        <div className={styles.table}>
          {cartItems?.map(({
            _id,
            color,
            image,
            price,
            name,
            amount,
            instrumentId,
            section,
          }: CartItemWithIdI) => (
            <InstrumentRow
              cartItemId={_id}
              key={_id}
              color={color}
              price={price}
              name={name}
              amount={amount}
              section={section}
              instrumentId={instrumentId}
              image={image}
            />
          ))}
        </div>

        <div className={styles.checkoutCard}>
          <div className={styles.checkoutInfo}>
            <div className={styles.checkoutCardField}>
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className={styles.checkoutCardField}>
              <span className={styles.total}>Total</span>
              <span className={styles.total}>{totalPrice}$</span>
            </div>
          </div>

          <Link href='/checkout'>
            <Button>Checkout</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
