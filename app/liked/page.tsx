"use client";

import React, { useState, useEffect } from "react";

import styles from "./page.module.scss";

import Link from "next/link";

import { Button, InstrumentCard } from "@/components";

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

  if (!likedItems.length) {
    return (
      <main className={styles.containerEmpty}>
        <h2 className={styles.headingEmpty}>You did not like anything yet</h2>

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
        {likedItems.map(() => {
          return (
            <InstrumentCard
              key={3 * Math.random()}
              name="name"
              instrumentType=""
              section="guitars"
              price="333$"
              colors={["red", "blue"]}
              image="dd"
              id={"id"}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Liked;
