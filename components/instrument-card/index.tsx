"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";

import styles from "./index.module.scss";

import Image from "next/image";
import { Button } from "../../components";

import { FiHeart } from "react-icons/fi";
import { ElectricGuitar } from "@/public/images";

import { addCartItem } from "@/services/cartService.ts/cartService";

interface InstrumentCardProps {
  isNew?: boolean;
  name: string;
  price: string;
  instrumentType: string;
  section: string;
  image: string;
  id: string;
  colors: any;
  withLikeIcon?: boolean;
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
  withLikeIcon,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("");

  const { push } = useRouter();

  const handleInstrumentNavigation = () => {
    push(`/shop/${section}/${id}`);
  };

  const handleLikeInstrument = (e: any) => {
    e.stopPropagation();

    console.log("like");
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

      <h3 className={styles.instrumentPrice}>{price}</h3>

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

      <Button className={styles.buttonAddToCart} onClick={handleAddToCart}>
        Add to cart
      </Button>

      {isNew && <div className={styles.newPin}>New</div>}

      {withLikeIcon && (
        <FiHeart
          className={styles.likeButton}
          size={24}
          onClick={handleLikeInstrument}
        />
      )}
    </div>
  );
};

export default InstrumentCard;
