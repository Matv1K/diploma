"use client";

import React, { useState, useEffect } from "react";

import styles from "./page.module.scss";

import Link from "next/link";
import { Button, InstrumentCard, Loader } from "@/components";

import { getLikedItems } from "@/services/likedService/likedService";

import { InstrumentCardI } from "@/types";

const Liked: React.FC = () => {
  const [likedItems, setLikedItems] = useState<InstrumentCardI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLikedItems = async () => {
      const items = await getLikedItems();

      setLikedItems(items);
      setIsLoading(false);
    };

    fetchLikedItems();
  }, [likedItems]);

  if (isLoading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  if (!likedItems.length) {
    return (
      <main className={styles.containerEmpty}>
        <h2>You did not like anything yet</h2>

        <Link href="/shop">
          <Button>Go back to shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h2>Liked Items</h2>

      <div className={styles.table}>
        {likedItems.map(
          ({
            _id,
            price,
            name,
            section,
            instrumentId,
            isNew = false,
            image,
            colors,
            brandName,
            instrumentType,
          }: InstrumentCardI) => {
            return (
              <InstrumentCard
                key={_id}
                name={name}
                instrumentType={instrumentType}
                section={section}
                price={price}
                colors={colors}
                image={image}
                id={instrumentId}
                brandName={brandName}
                isNew={isNew}
                withLikeIcon
              />
            );
          }
        )}
      </div>
    </main>
  );
};

export default Liked;
