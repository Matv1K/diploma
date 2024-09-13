"use client";

import React, { useState, useEffect } from "react";

import { useParams } from "next/navigation";

import { toast, ToastContainer } from "react-toastify";

import styles from "./page.module.scss";

import { Button, Comments } from "@/components";

import { getInstrument } from "@/services/instruments/instrumentService";

import { removeSeparator } from "@/utils";

import { TOAST_MESSAGES } from "../../../constants";

const notify = () => toast.success(TOAST_MESSAGES.ADD_TO_CART);

const checkboxData = ["red", "blue", "green", "yellow"];

const Instrument: React.FC = () => {
  const [instrument, setInstrument] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const { instrument: instrumentId } = useParams();

  useEffect(() => {
    const fetchInstrument = async () => {
      const instrument = await getInstrument(instrumentId);

      setInstrument(instrument);
    };

    fetchInstrument();
  }, []);

  const handleAddToCart = (e: any) => {
    e.stopPropagation();

    notify();
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
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

        <div className={styles.istrumentData}>
          <div className={styles.instrumentInfo}>
            <div className={styles.instrumentMainData}>
              <div className={styles.review}>
                <a href="#">Write a review</a>
              </div>

              <p className={styles.brandName}>{instrument?.brandName}</p>
              <h3 className={styles.price}>{instrument?.price}</h3>

              <p className={styles.availability}>
                The instrument is available at our store
              </p>
            </div>

            <div className={styles.radioButtons}>
              {checkboxData.map((color, index) => (
                <label key={index} className={styles.label}>
                  <input
                    name="color"
                    className={`${styles.radio} ${
                      selectedColor === color ? styles[color] : ""
                    }`}
                    type="radio"
                    value={color}
                    onChange={handleRadioChange}
                  />
                </label>
              ))}
            </div>

            <Button onClick={handleAddToCart}>Add to cart</Button>
          </div>

          <div className={styles.instrumentCharacteristics}>
            <p className={styles.instrumentDescription}>
              {instrument?.description}
            </p>

            <ul className={styles.instrumentCharacteristicsList}>
              <li>sadfasdf </li>
              <li>asdfasdf as fasdf</li>
              <li>asdfwrqwr qqwr qwrqwr qwr</li>
              <li>sdf qwr qwrqw rqwrqwrqwrqrw</li>
            </ul>
          </div>
        </div>
      </div>

      <Comments />

      <ToastContainer />
    </main>
  );
};

export default Instrument;
