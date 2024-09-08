"use client";

import React, { useState } from "react";

import styles from "./page.module.scss";

import { Piano, Guitar } from "@/public/images";
import { Chat } from "@/public/icons";

import { Carousel, SupportModal, Button } from "@/components";

import Image from "next/image";
import Link from "next/link";

import { POPULAR_ITEMS, POPULAR_SECTIONS } from "@/constants";

const POPULAR_BRANDS = [
  { name: "Taylor", id: 1 },
  { name: "Fender", id: 2 },
  { name: "Gibson", id: 5 },
  { name: "Cort", id: 3 },
  { name: "Flight", id: 4 },
];

const Home: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleClick = () => {
    setIsModalOpened(true);
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
          <h2 className={styles.brandsHeading}>
            We have the most popular brands
          </h2>

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
    </main>
  );
};

export default Home;
