"use client";

import React, { useState, useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import { toast, ToastContainer } from "react-toastify";

import styles from "./page.module.scss";

import Image from "next/image";

import { Button, Comments } from "@/components";

import { getInstrument } from "@/services/instruments/instrumentService";
import { addCartItem } from "@/services/cartService.ts/cartService";
import { addLikedItem } from "@/services/likedServices/likedService";

import { removeSeparator } from "@/utils";

import { FiHeart } from "react-icons/fi";

import { TOAST_MESSAGES } from "../../../constants";

const notify = () => toast.success(TOAST_MESSAGES.ADD_TO_CART);

const Instrument: React.FC = () => {
  const [instrument, setInstrument] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const { instrument: instrumentId } = useParams();

  const { push } = useRouter();

  useEffect(() => {
    const fetchInstrument = async () => {
      const instrument = await getInstrument(instrumentId);

      setInstrument(instrument);
    };

    fetchInstrument();
  }, []);

  const handleAddToCart = async (e: React.FormEvent) => {
    e.stopPropagation();

    await addCartItem({
      price: instrument?.price,
      name: instrument?.name,
      image: "///",
      color: "red",
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
    await addLikedItem({
      price: instrument?.price,
      name: instrument?.name,
      image: "///",
      color: "red",
      brandName: instrument?.brandName,
      instrumentId: instrument?._id,
      section: instrument?.section,
    });
  };

  return (
    <main>
      <h2>{removeSeparator(instrument?.name)}</h2>

      <div className={styles.pageSections}>
        {/* <Image
          className={styles.instrumentImage}
          src={ElectricGuitar}
          alt="instrument"
        /> */}
        <div className={styles.instrumentImage}>Instrument Image</div>

        <div className={styles.instrumentData}>
          <div className={styles.instrumentInfo}>
            <div className={styles.instrumentMainData}>
              <div className={styles.review}>
                <a href="#">Write a review</a>
              </div>

              <p className={styles.name}>
                {instrument?.name} /{" "}
                <span className={styles.brandName}>
                  {instrument?.brandName}
                </span>
              </p>
              <h3 className={styles.price}>
                {instrument?.onSale ? (
                  <>
                    <span className={styles.originalPrice}>
                      {instrument.price}
                    </span>{" "}
                    <span className={styles.salePrice}>
                      {" "}
                      {instrument.salePrice}
                    </span>
                  </>
                ) : (
                  instrument?.price
                )}
              </h3>

              <p className={styles.availability}>
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

          <div className={styles.instrumentCharacteristics}>
            <h4 className={styles.headingData}>Description: </h4>
            <p className={styles.instrumentDescription}>
              {instrument?.description}
            </p>

            <div>
              <h4 className={styles.headingData}>Characteristics: </h4>
              <ul className={styles.instrumentCharacteristicsList}>
                {instrument &&
                  Object.entries(instrument.characteristics).map(
                    ([key, value]: any) => {
                      return (
                        <li className={styles.listItem} key={key}>
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
            className={styles.likeIcon}
          />
        </div>
      </div>

      <Comments />

      <ToastContainer />
    </main>
  );
};

export default Instrument;
