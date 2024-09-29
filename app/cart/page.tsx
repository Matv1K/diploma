'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './page.module.scss';

import Link from 'next/link';
import { InstrumentRow, Button } from '@/components';

import { fetchCartItems } from '@/features/instruments/instrumentsSlice';
import { CartItemWithIdI } from '@/types';
import { RootState, AppDispatch } from '@/app/store';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [sessionCartItems, setSessionCartItems] = useState<CartItemWithIdI[]>([]);

  const isAuthorized = typeof window !== 'undefined' && !!localStorage.getItem('token');

  const cartItems = useSelector((state: RootState) => state.instruments.cartItems) || [];

  const calculateTotals = (items: CartItemWithIdI[]) => items.reduce((acc, item) => {
    const price = Number(item.price);
    const amount = item.amount || 0;
    acc.totalPrice += price * amount;
    acc.totalItems += amount;
    return acc;
  }, { totalPrice: 0, totalItems: 0 });

  const { totalPrice, totalItems } = isAuthorized
    ? calculateTotals(cartItems)
    : calculateTotals(sessionCartItems);

  const storedCartItems = sessionStorage.getItem('cartItems');

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchCartItems());
    } else {
      if (storedCartItems) {
        setSessionCartItems(JSON.parse(storedCartItems));
      }
    }
  }, [dispatch, isAuthorized, storedCartItems]);

  const displayedCartItems = isAuthorized ? cartItems : sessionCartItems;

  console.log(displayedCartItems);

  if (displayedCartItems?.length === 0) {
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
          {displayedCartItems?.map((item: CartItemWithIdI) => (
            <InstrumentRow
              cartItemId={item.cartItemId || item._id}
              key={item.cartItemId || item._id}
              {...item}
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
