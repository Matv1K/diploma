import React from "react";

import styles from "./index.module.scss";

import Link from "next/link";
import { Button } from "../../components";

import { FiTrash2 } from "react-icons/fi";

import { removeCartItem } from "@/services/cartService/cartService";
import {
  increaseAmount,
  decreaseAmount,
} from "@/services/cartService/cartService";

interface InstrumentRowProps {
  instrumentId: string;
  cartItemId: string;
  section: string;
  amount: number;
  color: string;
  price: string;
  name: string;
  image: string;
}

const InstrumentRow: React.FC<InstrumentRowProps> = ({
  section,
  cartItemId,
  instrumentId,
  name,
  color,
  price,
  amount,
  image,
}) => {
  const handleIncreaseCount = async () => {
    await increaseAmount(cartItemId);
  };

  const handleDecreaseCount = async () => {
    await decreaseAmount(cartItemId);
  };

  const handleRemoveItem = async () => {
    await removeCartItem(cartItemId);
  };

  return (
    <tr className={styles.row}>
      <th className={`${styles.cell}`}>
        <div className={styles.cellContainer}>
          <div className={styles.image}></div>

          <Link
            className={styles.link}
            href={`/shop/${section}/${instrumentId}`}
          >
            {name} / <span className={styles.color}>{color}</span>
          </Link>
        </div>
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

      <th className={styles.cell}>{price} </th>

      <th className={styles.cell} onClick={handleRemoveItem}>
        <FiTrash2 className={styles.iconTrash} size={24} />
      </th>
    </tr>
  );
};

export default InstrumentRow;
