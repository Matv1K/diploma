"use client";

import React from "react";

import { useParams } from "next/navigation";

import styles from "./page.module.scss";

import Image from "next/image";

import { Button, Comments } from "@/components";

import { toast, ToastContainer } from "react-toastify";

import { ElectricGuitar } from "@/public/images";

import { trimInstrumentName } from "@/utils";

import { TOAST_MESSAGES } from "@/constants";

const notify = () => toast.success(TOAST_MESSAGES.ADD_TO_CART);

const Instrument: React.FC = () => {
  const { instrument } = useParams();

  console.log(trimInstrumentName(instrument));

  const handleAddToCart = (e: any) => {
    e.stopPropagation();

    notify();
  };

  return (
    <main>
      <h2>Guitar {instrument}</h2>

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

              <p className={styles.brandName}>Gibson</p>
              <h3 className={styles.price}>999$</h3>

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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
              itaque labore sequi, molestiae laborum excepturi aliquid tempora
              cum, exercitationem illo cupiditate aspernatur modi commodi
              provident! Doloremque fuga quasi blanditiis ducimus.
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
