"use client";

import React from "react";

import styles from "./index.module.scss";

import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { Button } from "../../components";

import { ElectricGuitar } from "@/public/images";

import { trimInstrumentName } from "@/utils";

import { toast } from "react-toastify";

import { TOAST_MESSAGES } from "@/constants";

const notify = () => toast.success(TOAST_MESSAGES.ADD_TO_CART);

interface InstrumentCardProps {
  withNewPin?: boolean;
  name: string;
  price: string;
  instrumentType: string; // add enum with all possible types
}

const InstrumentCard: React.FC<InstrumentCardProps> = ({
  withNewPin,
  name,
  price,
  instrumentType,
}) => {
  const { push } = useRouter();

  const handleInstrumentNavigation = () => {
    push(`/shop/pianos/${trimInstrumentName(name)}`);
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();

    notify();
  };

  return (
    <div className={styles.instrument} onClick={handleInstrumentNavigation}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.instrumentImage}
          src={ElectricGuitar}
          alt="guitar"
          width={150}
          height={150}
        />
      </div>

      <h3 className={styles.price}>{price}</h3>

      <h4 className={styles.instrumentName}>
        {name} <span className={styles.instrumentType}>/ {instrumentType}</span>
      </h4>

      <Button className={styles.button} onClick={handleAddToCart}>
        Add to cart
      </Button>

      {withNewPin && <div className={styles.newPin}>New</div>}
    </div>
  );
};

export default InstrumentCard;
