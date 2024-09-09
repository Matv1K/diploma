"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

import { Piano, Guitar } from "@/public/images";
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

import { POPULAR_ITEMS, POPULAR_SECTIONS, POPULAR_BRANDS } from "@/constants";

const Home: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { push } = useRouter();

  const handleClick = () => {
    setIsModalOpened(true);
  };

  const handleSignInNavigation = () => {
    push("/sign-in");
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
            <span>Top quality brands on sale up to 70%</span>
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
          <Carousel items={POPULAR_ITEMS} />
        </div>

        <div className={styles.block}>
          <Image src={Guitar} alt="piano" width={200} height={200} />

          <h1 className={styles.headingMain}>
            Check out our{" "}
            <Link className={styles.eventsLink} href="/events">
              events
            </Link>
          </h1>
        </div>
      </div>
      {isModalOpened ? (
        <SupportModal setIsModalOpened={setIsModalOpened} />
      ) : (
        <Button onClick={handleClick} className={styles.buttonSupport}>
          <Image src={Chat} alt="Support" width={24} height={24} />
        </Button>
      )}
      {/* Show the modal if the user is not signed in */}
      {/* <Modal
        heading="My Modal"
        buttonName="Sign in"
        onButtonClick={handleSignInNavigation}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        distinctio, architecto sequi hic, dolor doloribus sint quam delectus
        consectetur fugiat molestiae nulla itaque voluptatibus. Consectetur,
        culpa enim! Itaque, minus praesentium.
      </Modal> */}
    </main>
  );
};

export default Home;
