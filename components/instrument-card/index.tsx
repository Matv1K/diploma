"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";

import styles from "./index.module.scss";

import Image from "next/image";
import { Button } from "../../components";

import { FiHeart } from "react-icons/fi";
import { ElectricGuitar } from "@/public/images";

import { addCartItem } from "@/services/cartService/cartService";
import {
  addLikedItem,
  getLikedItem,
  deleteLikedItem,
} from "@/services/likedService/likedService";

interface InstrumentCardProps {
  isNew?: boolean;
  name: string;
  price: string;
  instrumentType: string;
  section: string;
  image: string;
  id: string;
  colors: string[];
  withLikeIcon?: boolean;
  liked?: boolean;
  brandName?: string;
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
  brandName,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkLiked = async () => {
      const likedItem = await getLikedItem(id);

      if (likedItem) {
        setIsLiked(true);
      }
    };

    checkLiked();
  }, [id]);

  const { push } = useRouter();

  const handleInstrumentNavigation = () => {
    push(`/shop/${section}/${instrumentType}/${id}`);
  };

  const handleLikeItem = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (isLiked) {
      if (isLiked) {
        await deleteLikedItem(id);
        setIsLiked(false);
        return;
      }
      return;
    }

    await addLikedItem({
      price,
      name,
      image: "///",
      colors,
      brandName,
      instrumentId: id,
      section,
    });
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    await addCartItem({
      price,
      name,
      image,
      color: selectedColor,
      brandName: "cort",
      instrumentId: id,
      section,
      amount: 1,
    });

    push("/");
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        {name} <span className={styles.instrumentType}>/ {brandName}</span>
      </h4>

      <div
        className={styles.radioButtons}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {colors.map((color: string, index: number) => (
          <label key={index} className={styles.label}>
            <input
              name="color"
              className={`${styles.radio} ${
                selectedColor === color ? styles.selected : ""
              }`}
              type="radio"
              value={color}
              onChange={handleColorChange}
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
          size={24}
          onClick={handleLikeItem}
          className={`${styles.likeIcon} ${
            isLiked ? styles.likeIconFilled : ""
          }`}
        />
      )}
    </div>
  );
};

export default InstrumentCard;
