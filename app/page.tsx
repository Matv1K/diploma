import React from "react";

import styles from "./page.module.scss";

import { Carousel } from "@/components";

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
  return (
    <main>
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
      </div>
    </main>
  );
};

export default Home;
