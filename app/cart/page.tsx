'use client';

import React, { useEffect, useState, useRef } from 'react';
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true); // Track loading state

  const isAuthorized = typeof window !== 'undefined' && !!localStorage.getItem('token');
  const cartItems = useSelector((state: RootState) => state.instruments.cartItems) || [];

  // Memoize storedCartItems to prevent recalculating it on every render
  const storedCartItemsRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      storedCartItemsRef.current = sessionStorage.getItem('cartItems');
    }
  }, []); // Only run on mount

  // Helper function to calculate the total price and number of items
  const calculateTotals = (items: CartItemWithIdI[]) => {
    const totals = items.reduce(
      (acc, item) => {
        const price = Number(item.price);
        const amount = item.amount || 0;
        acc.totalPrice += price * amount;
        acc.totalItems += amount;
        return acc;
      },
      { totalPrice: 0, totalItems: 0 },
    );
    return totals;
  };

  useEffect(() => {
    // Fetch cart items from the server or sessionStorage
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

  // Recalculate totals whenever cart items change
  useEffect(() => {
    const { totalPrice, totalItems } = calculateTotals(displayedCartItems);
    setTotalPrice(totalPrice);
    setTotalItems(totalItems);
  }, [displayedCartItems]);

  // Update sessionStorage cart when sessionCartItems change (to trigger re-render)
  useEffect(() => {
    if (!isAuthorized) {
      sessionStorage.setItem('cartItems', JSON.stringify(sessionCartItems));
    }
  }, [sessionCartItems, isAuthorized]);

  // If still loading, show a loading state
  if (loading) {
    return <main className={styles.containerEmpty}><h2>Loading...</h2></main>;
  }

  // Render if the cart is empty
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

  // Render the cart content
  return (
    <main>
      <h2>Your Cart</h2>
      <div className={styles.cartLayout}>
        <div className={styles.table}>
          {displayedCartItems.map((item: CartItemWithIdI) => (
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
              <span className={styles.total}>{totalPrice.toFixed(2)}$</span>
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
