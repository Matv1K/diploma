import React from "react";

import styles from "./index.module.scss";

import Link from "next/link";

import { Button } from "../../components";

interface InstrumentRowProps {
  instrumentId: string;
  section: string;
  amount: number;
  color: string;
  price: string;
  name: string;
}

const InstrumentRow: React.FC<InstrumentRowProps> = ({
  section,
  instrumentId,
  name,
  color,
  price,
  amount,
}) => {
  const increaseCount = () => {
    console.log("increase");
  };

  const decreaseCount = () => {
    console.log("decrease");
  };

  return (
    <tr className={styles.row}>
      <th className={`${styles.cell}`}>
        <div className={styles.image}></div>
      </th>

      <th className={styles.cell}>
        <Link href={`/shop/${section}/${instrumentId}`}>{name}</Link>
      </th>

      <th className={styles.cell}>
        <Button className={styles.operator} onClick={decreaseCount}>
          -
        </Button>
        {amount}
        <Button className={styles.operator} onClick={increaseCount}>
          +
        </Button>
      </th>

      <th className={styles.cell}>{color}</th>

      <th className={styles.cell}>{price}</th>
    </tr>
  );
};

export default InstrumentRow;
