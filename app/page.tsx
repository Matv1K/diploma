"use client";

import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/navigation";

import { showModal } from "@/features/modal/modalSlice";

import styles from "./page.module.scss";

import { Piano } from "@/public/images";
import { Chat } from "@/public/icons";

import {
  Carousel,
  SupportModal,
  Button,
  Modal,
  AnimatedText,
} from "@/components";

import Image from "next/image";
import Link from "next/link";

import {
  POPULAR_ITEMS,
  POPULAR_SECTIONS,
  POPULAR_BRANDS,
  NEW_ITEMS,
} from "@/constants";

const Home: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  const isSignInModalOpen = useSelector((state: any) => state.modal.isOpen);

  const dispatch = useDispatch();

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

        <Image src={Piano} alt="piano" width={200} height={200} />
      </div>
      <div className={styles.sections}>
        <div>
          <h2>Sales!</h2>
          <div className={styles.sectionSale}>
            <Link className={styles.sale} href="/shop/sale">
              <span>Top quality brands on sale up to 70%</span>
            </Link>
          </div>
        </div>

        <div>
          <h2>Most popular sections</h2>
          <Carousel items={POPULAR_SECTIONS} />
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
          <Carousel items={POPULAR_ITEMS} isInstrumentsCarousel />
        </div>

        <div className={styles.block}>
          <Image src={Piano} alt="piano" width={200} height={180} />

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

          <Carousel items={NEW_ITEMS} isInstrumentsCarousel />
        </div>
      </div>

      {isModalOpened ? (
        <SupportModal setIsModalOpened={setIsModalOpened} />
      ) : (
        <Button onClick={handleClick} className={styles.buttonSupport}>
          <Image src={Chat} alt="Support" width={24} height={24} />
        </Button>
      )}

      {isSignInModalOpen && (
        <Modal
          heading="My Modal"
          buttonName="Sign in"
          onButtonClick={handleSignInNavigation}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          distinctio, architecto sequi hic, dolor doloribus sint quam delectus
          consectetur fugiat molestiae nulla itaque voluptatibus. Consectetur,
          culpa enim! Itaque, minus praesentium.
        </Modal>
      )}
    </main>
  );
};

export default Home;
