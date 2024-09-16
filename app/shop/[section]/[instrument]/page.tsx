"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import styles from "./page.module.scss";

import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { Button } from "@/components";

import { FiHeart } from "react-icons/fi";

import { removeSeparator } from "@/utils";

import { getInstrument } from "@/services/instruments/instrumentService";
import { addCartItem } from "@/services/cartService/cartService";
import {
  addLikedItem,
  getLikedItem,
  deleteLikedItem,
} from "@/services/likedService/likedService";

const Instrument: React.FC = () => {
  const [instrument, setInstrument] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isLiked, setIsLiked] = useState(false);

  const { instrument: instrumentId } = useParams();

  const { push } = useRouter();

  useEffect(() => {
    const fetchInstrument = async () => {
      const instrument = await getInstrument(instrumentId);

      setInstrument(instrument);

      const isLiked = await getLikedItem(instrumentId);

      if (isLiked) {
        setIsLiked(true);
      }
    };

    fetchInstrument();
  }, [instrumentId]);

  const handleAddToCart = async (e: React.FormEvent) => {
    e.stopPropagation();

    await addCartItem({
      price: instrument?.price,
      name: instrument?.name,
      image: "///",
      color: selectedColor,
      brandName: instrument?.brandName,
      instrumentId: instrument?._id,
      section: instrument?.section,
    });

    push("/");
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const handleLikeItem = async () => {
    if (isLiked) {
      await deleteLikedItem(instrumentId);
      setIsLiked(false);
      return;
    }

    await addLikedItem({
      price: instrument?.price,
      name: instrument?.name,
      image: "///",
      colors: instrument?.colors,
      brandName: instrument?.brandName,
      instrumentId: instrument?._id,
      section: instrument?.section,
    });
  };

  return (
    <main>
      <h2>{removeSeparator(instrument?.name)}</h2>

      <div className={styles.instrumentPageContainer}>
        <div className={styles.instrumentImage}>Instrument Image</div>

        <div className={styles.instrumentData}>
          <div className={styles.instrumentInfo}>
            <div className={styles.instrumentMainInfo}>
              <Link className={styles.infoReview} href="#">
                Write a review
              </Link>

              <p className={styles.infoName}>
                {instrument?.name} /{" "}
                <span className={styles.infoBrandName}>
                  {instrument?.brandName}
                </span>
              </p>

              <h3 className={styles.infoPrice}>
                {instrument?.onSale ? (
                  <>
                    <span className={styles.priceOriginal}>
                      {instrument.price}
                    </span>

                    <span>{instrument.salePrice}</span>
                  </>
                ) : (
                  instrument?.price
                )}
              </h3>

              <p className={styles.infoAvailable}>
                The instrument is available at our store
              </p>
            </div>

            <div className={styles.radioButtons}>
              {instrument?.colors?.map((color: string, index: number) => (
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

            <Button onClick={handleAddToCart}>Add to cart</Button>
          </div>

          <div>
            <h4>Description: </h4>

            <p className={styles.instrumentDescription}>
              {instrument?.description}
            </p>

            <div>
              <h4>Characteristics: </h4>
              <ul className={styles.instumentSpecs}>
                {instrument &&
                  Object.entries(instrument.characteristics).map(
                    ([key, value]: any) => {
                      return (
                        <li className={styles.instrumentSpec} key={key}>
                          {key}: {value}
                        </li>
                      );
                    }
                  )}
              </ul>
            </div>
          </div>

          <FiHeart
            size={24}
            onClick={handleLikeItem}
            className={`${styles.likeIcon} ${
              isLiked ? styles.likeIconFilled : ""
            }`}
          />
        </div>
      </div>

      <ToastContainer />
    </main>
  );
};

export default Instrument;
