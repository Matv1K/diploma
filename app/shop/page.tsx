"use client";

import React, { useState } from "react";

import styles from "./page.module.scss";

import { ToastContainer } from "react-toastify";

import InfiniteScroll from "react-infinite-scroll-component";

import { InstrumentCard, Loader } from "@/components";

import { INSTRUMENTS } from "@/constants";

const Shop: React.FC = () => {
  const [items, setItems] = useState(INSTRUMENTS.slice(0, 20));
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMoreData = () => {
    if (items.length >= INSTRUMENTS.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const newItems = INSTRUMENTS.slice(page * 20, (page + 1) * 20);
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1);
    }, 1000); // Simulate an API call delay
  };

  return (
    <main>
      <h2 className={styles.heading}>Shop</h2>

      <InfiniteScroll
        dataLength={items.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={
          <>
            <br />
            <Loader />
          </>
        }
        className={styles.instruments}
      >
        {items.map(({ name, id, price, instrumentType }) => (
          <div key={id} className={styles.instrumentCardWrapper}>
            <InstrumentCard
              price={price}
              name={name}
              instrumentType={instrumentType}
              withNewPin
            />
          </div>
        ))}
      </InfiniteScroll>

      <ToastContainer />
    </main>
  );
};

export default Shop;
