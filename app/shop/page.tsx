"use client";

import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import styles from "./page.module.scss";

import { ToastContainer } from "react-toastify";

import InfiniteScroll from "react-infinite-scroll-component";

import { Input, FilterCard } from "@/components";

import Image from "next/image";

import {
  InstrumentCard,
  Loader,
  SupportModal,
  Button,
  Modal,
} from "@/components";

import { Chat } from "@/public/icons";

import { showModal } from "@/features/modal/modalSlice";

import { INSTRUMENTS } from "../constants";

import { getInstruments } from "@/services/instruments/instrumentService";

const Shop: React.FC = () => {
  // const [items, setItems] = useState(INSTRUMENTS.slice(0, 20));
  // const [hasMore, setHasMore] = useState(true);
  // const [page, setPage] = useState(1);
  const [instruments, setInstruments] = useState([]);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInstruments = async () => {
      const instruments = await getInstruments();

      setInstruments(instruments);
    };

    fetchInstruments();
  }, []);

  const handleOpenModal = () => {
    dispatch(showModal());
    setIsModalOpened(true);
  };

  // const loadMoreData = () => {
  //   if (items.length >= INSTRUMENTS.length) {
  //     setHasMore(false);
  //     return;
  //   }

  //   setTimeout(() => {
  //     const newItems = INSTRUMENTS.slice(page * 20, (page + 1) * 20);
  //     setItems((prevItems) => [...prevItems, ...newItems]);
  //     setPage((prevPage) => prevPage + 1);
  //   }, 1000); // Simulate an API call delay
  // };

  return (
    <main>
      <h2 className={styles.heading}>Shop</h2>

      {/* <InfiniteScroll
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
      > */}
      {/* <div className={styles.wrapper}> */}
      {/* <FilterCard className={styles.filterCard} /> */}

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
          }: any) => (
            // <div key={id} className={styles.instrumentCardWrapper}>
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
            // </div>
          )
        )}
      </div>
      {/* </div> */}
      {/* </InfiniteScroll> */}

      {isModalOpened ? (
        <Modal buttonName="Send" heading="Modal">
          kasdjfkl ajsdlkfj askfdjlka sjflkjsdfk
          <Input type="text" />
        </Modal>
      ) : (
        <Button
          option="outline"
          onClick={handleOpenModal}
          className={styles.buttonSupport}
        >
          <Image src={Chat} alt="Support" width={24} height={24} />
        </Button>
      )}

      <ToastContainer />
    </main>
  );
};

export default Shop;
