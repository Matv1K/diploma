import React from "react";
import { useDispatch } from "react-redux";

import styles from "./index.module.scss";

import Link from "next/link";
import { Button } from "../../components";

import { FiTrash2 } from "react-icons/fi";

import {
  removeCartItem,
  increaseAmount,
  decreaseAmount,
} from "@/services/cartService/cartService";

import {
  removeItem,
  increaseItemAmount,
  decreaseItemAmount,
} from "@/features/instruments/instrumentsSlice";

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
  const dispatch = useDispatch();

  const handleIncreaseCount = async () => {
    try {
      await increaseAmount(cartItemId);
      dispatch(increaseItemAmount(cartItemId));
    } catch (error) {
      console.error("Failed to increase item amount:", error);
    }
  };

  const handleDecreaseCount = async () => {
    try {
      await decreaseAmount(cartItemId);
      dispatch(decreaseItemAmount(cartItemId));
    } catch (error) {
      console.error("Failed to decrease item amount:", error);
    }
  };

  const handleRemoveItem = async () => {
    try {
      await removeCartItem(cartItemId);
      dispatch(removeItem(cartItemId));
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
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
