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
  const handleIncreaseCount = () => {
    console.log("increase");
  };

  const handleDecreaseCount = () => {
    console.log("decrease");
  };

  return (
    <tr className={styles.row}>
      <th className={`${styles.cell}`}>
        <div className={styles.image}></div>
      </th>

      <th className={styles.cell}>
        <Link className={styles.link} href={`/shop/${section}/${instrumentId}`}>
          {name} / {color}
        </Link>
      </th>

      <th className={styles.cell}>
        <Button className={styles.operator} onClick={handleDecreaseCount}>
          -
        </Button>
        {amount}
        <Button className={styles.operator} onClick={handleIncreaseCount}>
          +
        </Button>
      </th>

      <th className={styles.cell}>{price}</th>
    </tr>
  );
};

export default InstrumentRow;
