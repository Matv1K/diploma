'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './page.module.scss';

import Link from 'next/link';
import { InstrumentRow, Button, Loader } from '@/components';

import { fetchCartItems } from '@/features/instruments/instrumentsSlice';

import { CartItemWithIdI } from '@/types';
import { RootState, AppDispatch } from '@/app/store';
import { getTotalPrice } from '@/utils';

const Cart: React.FC = () => {
  const [sessionCartItems, setSessionCartItems] = useState<CartItemWithIdI[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch: AppDispatch = useDispatch();

  const isAuthorized = typeof window !== 'undefined' && !!localStorage.getItem('token');
  const cartItems = useSelector((state: RootState) => state.instruments.cartItems) || [];

  const storedCartItemsRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      storedCartItemsRef.current = sessionStorage.getItem('cartItems');
    }
  }, []);

  useEffect(() => {
    const loadCartItems = async () => {
      if (isAuthorized) {
        await dispatch(fetchCartItems());
      } else if (storedCartItemsRef.current) {
        setSessionCartItems(JSON.parse(storedCartItemsRef.current));
      }

      setLoading(false);
    };

    loadCartItems();
  }, [dispatch, isAuthorized]);

  const displayedCartItems = isAuthorized ? cartItems : sessionCartItems;

  useEffect(() => {
    const totalPrice = getTotalPrice(displayedCartItems);

    setTotalPrice(totalPrice);
  }, [displayedCartItems]);

  useEffect(() => {
    if (!isAuthorized) {
      sessionStorage.setItem('cartItems', JSON.stringify(sessionCartItems));
    }
  }, [sessionCartItems, isAuthorized]);

  if (loading) {
    return (
      <main className={styles.containerEmpty}>
        <Loader />
      </main>
    );
  }

  if (!loading && displayedCartItems.length === 0) {
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
          {displayedCartItems.map((item: CartItemWithIdI) => (
            <InstrumentRow cartItemId={item._id} key={item._id} {...item} />
          ))}
        </div>

        <div className={styles.checkoutCard}>
          <div className={styles.checkoutInfo}>
            <div className={styles.checkoutCardField}>
              <span>Items</span>
              <span>{sessionCartItems.length}</span>
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
