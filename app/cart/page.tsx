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

  return (
    <main>
      <h2>Your Cart</h2>

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

      <Link href="/checkout">
        <Button>Checkout</Button>
      </Link>
    </main>
  );
};

export default Cart;
