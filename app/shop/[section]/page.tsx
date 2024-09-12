"use client";

import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import styles from "./page.module.scss";

import { InstrumentCard } from "@/components";

import { getInstrumentsBySection } from "@/services/instruments/instrumentService";

import { removeSeparator } from "@/utils";

const Section: React.FC = () => {
  const [instruments, setInstruments] = useState<any>([]);

  const { section: instrumentsSection } = useParams();

  useEffect(() => {
    const fetchInstrumentsBySection = async () => {
      const instruments = await getInstrumentsBySection(instrumentsSection);

      setInstruments(instruments);
    };

    fetchInstrumentsBySection();
  }, []);

  return (
    <main>
      <h2>{removeSeparator(instrumentsSection)}</h2>

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
    </main>
  );
};

export default Section;
