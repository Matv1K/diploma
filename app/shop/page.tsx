"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./page.module.scss";

import { ToastContainer } from "react-toastify";
import { InstrumentCard, Button, Modal, Input } from "@/components";

import { FiSend, FiMessageCircle } from "react-icons/fi";

import { ButtonOptions, InputTypes } from "@/types";

import { showModal } from "@/features/modal/modalSlice";

import { getInstruments } from "@/services/instruments/instrumentService";

import { InstrumentCardI } from "@/types";

const Shop: React.FC = () => {
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

  return (
    <main>
      <h2>Shop</h2>

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
          }: InstrumentCardI) => (
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
              brandName={brandName}
              withLikeIcon
            />
          )
        )}
      </div>

      {isModalOpened ? (
        <Modal
          setIsModalOpened={setIsModalOpened}
          buttonName="Send"
          heading="Support"
        >
          <div>Ask your questions here.</div>

          <div className={styles.modalData}>
            <Input
              className={styles.modalInput}
              type={InputTypes.TEXT}
              placeholder="Write your message"
            />

            <Button option={ButtonOptions.OUTILINE}>
              <FiSend size={24} />
            </Button>
          </div>
        </Modal>
      ) : (
        <Button
          option={ButtonOptions.OUTILINE}
          onClick={handleOpenModal}
          className={styles.buttonSupportModal}
        >
          <FiMessageCircle size={24} />
        </Button>
      )}

      <ToastContainer />
    </main>
  );
};

export default Shop;
