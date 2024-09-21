"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";
import styles from "./index.module.scss";

import { toast } from "react-toastify";

import Image from "next/image";
import { Button } from "../../components";

import { FiHeart } from "react-icons/fi";
import { ElectricGuitar } from "@/public/images";

import { addItemToCart } from "@/features/instruments/instrumentsSlice";
import { likeItem, unlikeItem } from "@/features/instruments/instrumentsSlice";

import { addCartItem } from "@/services/cart/cartService";
import { getLikedItem } from "@/services/liked/likedService";

import { AppDispatch } from "@/app/store";

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

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const checkLiked = async () => {
      const likedItem = await getLikedItem(id);
      setIsLiked(!!likedItem);
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

    try {
      if (isLiked) {
        await dispatch(unlikeItem(id));
        toast.success("You do not like the item anymore");
        setIsLiked(false);
      } else {
        await dispatch(
          likeItem({
            price,
            name,
            image: "///",
            colors,
            brandName,
            instrumentId: id,
            section,
          })
        );
        toast.success("You like the item");
        setIsLiked(true);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      const newItem = await addCartItem({
        price,
        name,
        image,
        color: selectedColor,
        brandName: "cort",
        instrumentId: id,
        section,
        amount: 1,
      });

      dispatch(addItemToCart(newItem));
      toast.success(`${name} has been added to the cart!`);
      push("/");
    } catch (error) {
      toast.error(`Failed to add ${name} to the cart.`);
    }
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
