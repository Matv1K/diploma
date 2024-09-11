"use client";

import React from "react";

import styles from "./index.module.scss";

import { useRouter } from "next/navigation";

import "react-multi-carousel/lib/styles.css";

import ReactCarousel from "react-multi-carousel";

import { trimInstrumentName } from "@/utils";

interface CarouselProps {
  items: { name: string; id: number; text?: string }[];
  isInstrumentsCarousel?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  isInstrumentsCarousel,
}) => {
  const { push } = useRouter();

  const handleItemNavigation = (section: string, name: string) => {
    if (isInstrumentsCarousel) {
      push(`/shop/${section}/${trimInstrumentName(name)}`);
    } else {
      push(`/shop/${name.toLocaleLowerCase()}`);
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <ReactCarousel
      swipeable={false}
      draggable={false}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass={styles.carouselContainer}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass={styles.carouselItemPadding}
    >
      {items.map(({ name, id, text }) => (
        <div
          onClick={() => handleItemNavigation("pianos", name)}
          key={id}
          className={styles.carouselItem}
        >
          <h3>{name}</h3>
          {/* {text && <p style={text && { display: "block" }}>{text}</p>} */}
        </div>
      ))}
    </ReactCarousel>
  );
};

export default Carousel;
