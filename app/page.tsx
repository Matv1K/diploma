"use client";

import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

import { Carousel, Button, Modal, Input } from "@/components";

import Image from "next/image";
import Link from "next/link";

import { showModal } from "@/features/modal/modalSlice";

import { Piano } from "@/public/images";
import { Chat, Send } from "@/public/icons";

import { InputTypes } from "@/types";

import {
  getPopularIstruments,
  getNewInstruments,
} from "@/services/instruments/instrumentService";

import useCurrentUser from "@/hooks/useCurrentUser";

import { ALL_SECTIONS, POPULAR_BRANDS } from "./constants";

import { ButtonOptions } from "@/types";

const Home: React.FC = () => {
  // ADD TYPES TO THE STATES
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [popularInstruments, setPopularInstruments] = useState<any>([]);
  const [newInstruments, setNewInstruments] = useState<any>([]);

  useEffect(() => {
    const fetchInstruments = async () => {
      const popularInstruments = await getPopularIstruments();
      const newInstruments = await getNewInstruments();

      setPopularInstruments(popularInstruments);
      setNewInstruments(newInstruments);
    };

    fetchInstruments();
  }, []);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(showModal());
    setIsModalOpened(true);
  };

  const isSignInModalOpen = useSelector((state: any) => state.modal.isOpen);

  const { push } = useRouter();

  const handleClick = () => {
    setIsModalOpened(true);
  };

  const handleSignInNavigation = () => {
    push("/sign-in");
  };

  const handleShowModal = () => {
    dispatch(showModal());
  };

  return (
    <main>
      <div className={styles.block}>
        <h1 className={styles.headingMain}>
          Best platform for aspiring musicians
        </h1>

        <Image
          className={styles.image}
          src={Piano}
          alt="piano"
          width={200}
          height={200}
        />
      </div>
      <div className={styles.sections}>
        <div>
          <h2>Sales!</h2>
          <Link className={styles.sale} href="/shop/sale">
            <div className={styles.sectionSale}>
              <span>Top quality brands on sale up to 70%</span>
            </div>
          </Link>
        </div>

        <div>
          <h2>Most popular sections</h2>
          <Carousel items={ALL_SECTIONS} />
        </div>

        <div className={styles.brandsSection}>
          <h2 className={styles.brandsHeading}>Most popular brands</h2>

          <div className={styles.brands}>
            {POPULAR_BRANDS.map(({ name, id }) => {
              return (
                <div className={styles.brandCard} key={id}>
                  <Image
                    src={`/images/${name.toLocaleLowerCase()}.png`}
                    alt={name}
                    width={200}
                    height={100}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2>Most popular items</h2>
          <Carousel items={popularInstruments} isInstrumentsCarousel />
        </div>

        <div className={styles.block}>
          <Image
            className={styles.image}
            src={Piano}
            alt="piano"
            width={200}
            height={180}
          />

          <h1 className={styles.headingMain}>
            Check out our{" "}
            {isUserLoggedIn ? (
              <Link href="/events" className={styles.eventsLink}>
                events
              </Link>
            ) : (
              <span className={styles.eventsLink} onClick={handleShowModal}>
                events
              </span>
            )}
          </h1>
        </div>

        <div>
          <h2>New items</h2>

          <Carousel items={newInstruments} isInstrumentsCarousel />
        </div>
      </div>

      {isModalOpened ? (
        <Modal
          setIsModalOpened={setIsModalOpened}
          buttonName="Send"
          heading="Support"
          className={styles.modal}
        >
          Ask your questions here.
          <div className={styles.actionData}>
            <Input
              className={styles.messageInput}
              type={InputTypes.TEXT}
              placeholder="Write your message"
            />
            <Button option={ButtonOptions.OUTILINE}>
              <Image src={Send} alt="Send" width={24} height={24} />
            </Button>
          </div>
        </Modal>
      ) : (
        <Button
          option={ButtonOptions.OUTILINE}
          onClick={handleOpenModal}
          className={styles.buttonSupport}
        >
          <Image src={Chat} alt="Support" width={24} height={24} />
        </Button>
      )}
    </main>
  );
};

export default Home;
