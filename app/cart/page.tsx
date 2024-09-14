"use client";

import React, { useState, useEffect } from "react";

import styles from "./page.module.scss";

import Link from "next/link";

import { InstrumentRow, Button } from "@/components";

import { getCartItems } from "@/services/cartService.ts/cartService";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();

      setCartItems(items);
    };

    fetchCartItems();
  }, []);

  if (!cartItems.length) {
    return (
      <main className={styles.containerEmpty}>
        <h2 className={styles.headingEmpty}>Your cart is empty</h2>

        <Link href="/shop">
          <Button>Go back to shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h2>Your Cart</h2>

      <div className={styles.cartLayout}>
        <table className={styles.table}>
          <tbody>
            {cartItems.map(
              ({
                _id,
                color,
                image,
                price,
                name,
                amount,
                instrumentId,
                section,
              }: any) => {
                return (
                  <InstrumentRow
                    key={_id}
                    color={color}
                    price={price}
                    name={name}
                    amount={amount}
                    section={section}
                    instrumentId={instrumentId}
                  />
                );
              }
            )}
          </tbody>
        </table>

        <div className={styles.checkoutCard}>
          <div className={styles.checkoutInfo}>
            <div className={styles.checkoutCardField}>
              <span>Items</span>
              <span>2</span>
            </div>

            <div className={styles.checkoutCardField}>
              <span>My discount</span>
              <span>5%</span>
            </div>

            <div className={styles.checkoutCardField}>
              <span className={styles.total}>Total</span>
              <span className={styles.total}>2000$</span>
            </div>
          </div>

          <Link href="/checkout">
            <Button>Checkout</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
