"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import styles from "./page.module.scss";

import { InstrumentCard } from "@/components";

import { removeSeparator } from "@/utils";

import { getInstrumentsBySection } from "@/services/instruments/instrumentService";

import { InstrumentCardI } from "@/types";

const Section: React.FC = () => {
  const [instruments, setInstruments] = useState<any>([]);

  const { section: instrumentsSection } = useParams();

  const sectionName = Array.isArray(instrumentsSection)
    ? instrumentsSection[0]
    : instrumentsSection;

  useEffect(() => {
    const fetchInstrumentsBySection = async () => {
      const instruments = await getInstrumentsBySection(instrumentsSection);

      setInstruments(instruments);
    };

    fetchInstrumentsBySection();
  }, [sectionName]);

  return (
    <main>
      <h2 className={styles.headingSection}>{removeSeparator(sectionName)}</h2>

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
                colors={colors}
                image={image}
                brandName={brandName}
                withLikeIcon
              />
            );
          }
        )}
      </div>
    </main>
  );
};

export default Section;
