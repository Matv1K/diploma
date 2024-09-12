"use client";

import React, { useState, useEffect } from "react";

import { useParams } from "next/navigation";

import { toast, ToastContainer } from "react-toastify";

import styles from "./page.module.scss";

import { Button, Comments } from "@/components";

import { getInstrument } from "@/services/instruments/instrumentService";

import { TOAST_MESSAGES } from "@/constants";

const notify = () => toast.success(TOAST_MESSAGES.ADD_TO_CART);

const Instrument: React.FC = () => {
  const [instrument, setInstrument] = useState<any>(null);

  const { instrument: instrumentId } = useParams();

  useEffect(() => {
    const fetchInstrument = async () => {
      const instrument = await getInstrument(instrumentId);

      setInstrument(instrument);
    };

    fetchInstrument();
  }, []);

  console.log(instrument);

  const handleAddToCart = (e: any) => {
    e.stopPropagation();

    notify();
  };

  return (
    <main>
      <h2>Guitar {instrument?.name}</h2>

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

            <div className={styles.checkboxButtons}>
              <input className={styles.checkbox} type="radio" />
              <input className={styles.checkbox} type="radio" />
              <input className={styles.checkbox} type="radio" />
              <input className={styles.checkbox} type="radio" />
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
