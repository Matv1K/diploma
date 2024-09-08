"use client";

import React, { useState } from "react";

import styles from "./page.module.scss";

import Piano from "../public/piano-secondary.png";
import Guitar from "../public/guitar.png";
import Chat from "../public/chat-svgrepo-com.svg";

import { Carousel, SupportModal, Button } from "@/components";

import Image from "next/image";
import Link from "next/link";

// THERE SHOULD BE 5 MOST POPULAR SECTIONS

const POPULAR_SECTIONS = [
  { name: "Guitars", id: 1 },
  { name: "Pianos", id: 2 },
  { name: "Drums", id: 4 },
  { name: "Cellos", id: 3 },
  { name: "Harmonicas", id: 5 },
];

// THERE SHOULD BE 10 MOST POPULAR INSTRUMENTS

const POPULAR_ITEMS = [
  { name: "Fender CD60", id: 1 },
  { name: "Taylor 350", id: 2 },
  { name: "Martin OM-28", id: 3 },
  { name: "Takamine GY11ME Parlor", id: 4 },
  { name: "Taylor Academy 12e-N Nylon", id: 5 },
];

const Home: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleClick = () => {
    console.log("clicked");
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
          <h2>On Sale!</h2>
          <div className={styles.sectionSale}>
            <span>Top quality brands on sale up to 70%</span>
          </div>
        </div>

        <div>
          <h2>Most popular sections</h2>
          <Carousel items={POPULAR_SECTIONS} />
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
        <SupportModal />
      ) : (
        <Button onClick={handleClick} className={styles.buttonSupport}>
          <Image src={Chat} alt="Support" width={24} height={24} />
        </Button>
      )}
    </main>
  );
};

export default Home;
