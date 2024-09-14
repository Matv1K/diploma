import React from "react";

import styles from "./page.module.scss";

import Image from "next/image";

import { InstrumentsTable } from "@/components";

const LIKED_ITEMS = [
  { name: "Fender-cd60", id: 1 },
  { name: "", id: 2 },
];

const Liked: React.FC = () => {
  return (
    <main>
      <h2>Liked Items</h2>

      <table className={styles.table}>
        <tbody>
          <tr className={styles.row}>
            <th className={`${styles.cell}`}>
              <div className={styles.image}></div>
            </th>

            <th className={styles.cell}>Fender-cd60</th>
            <th className={styles.cell}>3</th>
            <th className={styles.cell}>999$</th>
          </tr>

          <tr className={styles.row}>
            <th className={`${styles.cell}`}>
              <div className={styles.image}></div>
            </th>

            <th className={styles.cell}>Fender-cd60</th>
            <th className={styles.cell}>3</th>
            <th className={styles.cell}>999$</th>
          </tr>
        </tbody>
      </table>

      {!LIKED_ITEMS.length && (
        <h5 className={styles.empty}>You did not like anything yet</h5>
      )}
    </main>
  );
};

export default Liked;
