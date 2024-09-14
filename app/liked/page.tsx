"use client";

import React, { useState, useEffect } from "react";

import styles from "./page.module.scss";

import Image from "next/image";

import { InstrumentRow } from "@/components";

import { getLikedItems } from "@/services/likedServices/likedService";

const Liked: React.FC = () => {
  const [likedItems, setLikedItems] = useState<any>([]);

  useEffect(() => {
    const fetchLikedItems = async () => {
      const items = await getLikedItems();

      setLikedItems(items);
    };

    fetchLikedItems();
  }, []);

  return (
    <main>
      <h2>Liked Items</h2>

      <table className={styles.table}>
        <tbody>
          {likedItems.map(
            ({ name, instrumentId, section, color, price }: any) => {
              return (
                <InstrumentRow
                  name="cort"
                  amount={0}
                  instrumentId="3"
                  section="guitars"
                  color="brown"
                  price="999$"
                />
              );
            }
          )}
        </tbody>
      </table>
    </main>
  );
};

export default Liked;
