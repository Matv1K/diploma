import React from "react";

import styles from "./page.module.scss";

import { InstrumentsTable } from "@/components";

const POSTPONED_ITEMS = [
  { name: "", id: 1 },
  { name: "", id: 2 },
];

const Liked: React.FC = () => {
  return (
    <main>
      <h2>Liked Items</h2>

      <h5 className={styles.empty}>You did not like anything yet</h5>
    </main>
  );
};

export default Liked;
