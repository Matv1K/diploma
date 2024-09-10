import React from "react";

import styles from "./page.module.scss";

import { InstrumentCard } from "@/components";

const Shop: React.FC = () => {
  return (
    <main>
      <h2 className={styles.heading}>Shop</h2>

      <div className={styles.instruments}>
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
        <InstrumentCard name="Cort f3" price="999$" instrumentType="guitar" />
      </div>
    </main>
  );
};

export default Shop;
