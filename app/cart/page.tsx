"use client";

import React, { useState, useEffect } from "react";

import styles from "./page.module.scss";

import Link from "next/link";

import { InstrumentRow, Button } from "@/components";

import { getCartItems } from "@/services/cartService/cartService";

import { CartItemI } from "@/types";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const { cartItems: items, length, totalPrice } = await getCartItems();

      setCartItems(items);
      setTotalPrice(totalPrice);
      setTotalItems(length);
    };

    fetchCartItems();
  }, []);

  if (cartItems?.length === 0) {
    return (
      <main className={styles.containerEmpty}>
        <h2>Your cart is empty</h2>

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
            {cartItems?.map(
              ({
                _id,
                color,
                image,
                price,
                name,
                amount,
                instrumentId,
                section,
              }: CartItemI) => {
                return (
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
                );
              }
            )}
          </tbody>
        </table>

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

          <Link href="/checkout">
            <Button>Checkout</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
