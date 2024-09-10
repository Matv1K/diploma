import React from "react";

import styles from "./page.module.scss";

import { ToastContainer } from "react-toastify";

import { InstrumentCard } from "@/components";

import { INSTRUMENTS } from "@/constants";

const Shop: React.FC = () => {
  return (
    <main>
      <h2 className={styles.heading}>Shop</h2>

      <div className={styles.instruments}>
        {INSTRUMENTS.map(({ name, id, price, instrumentType }) => {
          return (
            <InstrumentCard
              key={id}
              price={price}
              name={name}
              instrumentType={instrumentType}
              withNewPin
            />
          );
        })}

        <ToastContainer />
      </div>
    </main>
  );
};

export default Shop;
