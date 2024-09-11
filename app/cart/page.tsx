import React from "react";

import styles from "./page.module.scss";

import { InstrumentsTable } from "@/components";

const Cart: React.FC = () => {
  return (
    <main>
      <h2>Cart</h2>

      <h5 className={styles.empty}>Your cart is empty</h5>
    </main>
  );
};

export default Cart;
