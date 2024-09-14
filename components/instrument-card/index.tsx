"use client";

import React, { useState } from "react";

import styles from "./index.module.scss";

import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { Button } from "../../components";

import { ElectricGuitar } from "@/public/images";
import { Heart } from "@/public/icons";

import { trimInstrumentName } from "@/utils";

import { addCartItem } from "@/services/cartService.ts/cartService";

import { toast } from "react-toastify";

import { TOAST_MESSAGES } from "@/app/constants";

const notify = () => toast.success(TOAST_MESSAGES.ADD_TO_CART);

const COLORS = ["yellow", "green"];

interface InstrumentCardProps {
  isNew?: boolean;
  name: string;
  price: string;
  instrumentType: string; // add enum with all possible types
  section: string;
  image: string;
  id: string;
  colors: any;
}

const InstrumentCard: React.FC<InstrumentCardProps> = ({
  isNew,
  name,
  price,
  section,
  instrumentType,
  image,
  id,
  colors,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("");

  const { push } = useRouter();

  const handleInstrumentNavigation = () => {
    push(`/shop/${section}/${id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    await addCartItem({
      price,
      name,
      image,
      color: "red",
      brandName: "cort",
      instrumentId: id,
      section,
    });

    push("/");
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    setSelectedColor(e.target.value);
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

      <div className={styles.radioButtons}>
        {colors.map((color: string, index: number) => (
          <label key={index} className={styles.label}>
            <input
              name="color"
              className={`${styles.radio} ${
                selectedColor === color ? styles.selected : ""
              }`}
              type="radio"
              value={color}
              onChange={handleRadioChange}
              style={{ color }}
            />
          </label>
        ))}
      </div>
      <Button className={styles.button} onClick={handleAddToCart}>
        Add to cart
      </Button>
      {isNew && <div className={styles.newPin}>New</div>}
    </div>
  );
};

export default InstrumentCard;
