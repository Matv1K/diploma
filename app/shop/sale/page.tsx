"use client";

import React, { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";

import styles from "./page.module.scss";

import { InstrumentCard } from "@/components";

import { getInstrumentsOnSale } from "@/services/instruments/instrumentService";

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
            name,
            section,
            _id,
            price,
            instrumentType,
            isNew,
            image,
          }: any) => {
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
