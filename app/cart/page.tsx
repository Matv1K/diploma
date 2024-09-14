"use client";

import React, { useState } from "react";

import styles from "./page.module.scss";

import Link from "next/link";

import { InstrumentsTable, Button } from "@/components";

const LIKED_ITEMS = [
  { name: "Fender-cd60", id: 1 },
  { name: "", id: 2 },
];

const Cart: React.FC = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <main>
      <h2>Cart</h2>

      <table className={styles.table}>
        <thead>
          <tr className={styles.headRow}>
            <th className={styles.cell}>Image</th>
            <th className={styles.cell}>Name</th>
            <th className={styles.cell}>Amount</th>
            <th className={styles.cell}>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.row}>
            <th className={`${styles.cell}`}>
              <div className={styles.image}></div>
            </th>

            <th className={styles.cell}>Fender-cd60</th>
            <th className={styles.cell}>
              <span className={styles.operator} onClick={decreaseCount}>
                -
              </span>
              {count}
              <span className={styles.operator} onClick={increaseCount}>
                +
              </span>
            </th>
            <th className={styles.cell}>999$</th>
          </tr>

          <tr className={styles.row}>
            <th className={`${styles.cell}`}>
              <div className={styles.image}></div>
            </th>

            <th className={styles.cell}>Fender-cd60</th>
            <th className={styles.cell}>
              <span className={styles.operator} onClick={decreaseCount}>
                -
              </span>
              {count}
              <span className={styles.operator} onClick={increaseCount}>
                +
              </span>
            </th>
            <th className={styles.cell}>999$</th>
          </tr>
        </tbody>
      </table>

      <Link href="/checkout">
        <Button>Checkout</Button>
      </Link>

      {!LIKED_ITEMS.length && (
        <h5 className={styles.empty}>Your cart is empty</h5>
      )}
    </main>
  );
};

export default Cart;
