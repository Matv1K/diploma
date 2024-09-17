"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import styles from "./page.module.scss";

import { InstrumentCard } from "@/components";

import { removeSeparator } from "@/utils";
import { getInstrumentBySubtype } from "@/services/instruments/instrumentService";

const Subtype = () => {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(instruments);

  const { subtype } = useParams();

  const convertedSubtype = Array.isArray(subtype) ? subtype[0] : subtype;

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const data = await getInstrumentBySubtype(convertedSubtype);
        setInstruments(data);
      } catch (error) {
        console.error("Error fetching instruments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (convertedSubtype) {
      fetchInstruments();
    }
  }, [convertedSubtype]);

  return (
    <main>
      <h2>{removeSeparator(convertedSubtype)}</h2>
      <div className={styles.instruments}>
        {instruments.map(
          ({
            _id,
            price,
            name,
            section,
            instrumentType,
            isNew,
            image,
            colors,
            brandName,
          }: any) => (
            <InstrumentCard
              id={_id}
              key={_id}
              name={name}
              price={price}
              section={section}
              instrumentType={instrumentType}
              isNew={isNew}
              colors={colors}
              image={image}
              brandName={brandName}
              withLikeIcon
            />
          )
        )}
      </div>
    </main>
  );
};

export default Subtype;
