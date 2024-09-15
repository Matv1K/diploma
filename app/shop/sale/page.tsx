"use client";

import React, { useState, useEffect } from "react";

import styles from "./page.module.scss";

import { ToastContainer } from "react-toastify";
import { InstrumentCard } from "@/components";

import { getInstrumentsOnSale } from "@/services/instruments/instrumentService";

import { InstrumentCardI } from "@/types";

const Sale: React.FC = () => {
  const [instruments, setInstruments] = useState<any>([]);

  useEffect(() => {
    const fetchInstruments = async () => {
      const instruments = await getInstrumentsOnSale();

      setInstruments(instruments);
    };

    fetchInstruments();
  }, []);

  return (
    <main>
      <h2>Sale</h2>

      <div className={styles.instruments}>
        {instruments.map(
          ({
            _id,
            name,
            section,
            price,
            instrumentType,
            isNew,
            image,
            colors,
          }: InstrumentCardI) => {
            return (
              <InstrumentCard
                key={_id}
                id={_id}
                price={price}
                name={name}
                section={section}
                instrumentType={instrumentType}
                isNew={isNew}
                image={image}
                colors={colors}
                withLikeIcon
              />
            );
          }
        )}
      </div>

      <ToastContainer />
    </main>
  );
};

export default Sale;
