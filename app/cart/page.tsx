'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './page.module.scss';

import Link from 'next/link';
import { InstrumentRow, Button, Loader } from '@/components';

import { fetchCartItems } from '@/features/instruments/instrumentsSlice';

import { getTotalPrice } from '@/utils';

import { CartItemUnionI, CartItemWithLocalIdI } from '@/types';
import { RootState, AppDispatch } from '@/app/store';

const Cart: React.FC = () => {
  const [sessionCartItems, setSessionCartItems] = useState<CartItemWithLocalIdI[]>([]);
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
    const handleCartUpdate = () => {
      if (typeof window !== 'undefined') {
        const storedCartItems = sessionStorage.getItem('cartItems');

        if (storedCartItems) {
          setSessionCartItems(JSON.parse(storedCartItems));
        }
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

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
          {displayedCartItems.map((item: CartItemUnionI) => {
            const id = ('_id' in item) ? item._id : item.cartItemId;

            return <InstrumentRow cartItemId={id} key={id} {...item} />;
          })}
        </div>

        <div className={styles.checkoutCard}>
          <div className={styles.checkoutInfo}>
            <div className={styles.checkoutCardField}>
              <span>Items</span>
              <span>{displayedCartItems.length}</span>
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
