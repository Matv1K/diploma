"use client";

import React from "react";

import styles from "./index.module.scss";

import ReactCarousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

interface CarouselProps {
  items: { name: string; id: number }[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
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
      {items.map(({ name, id }) => (
        <div key={id} className={styles.carouselItem}>
          <h3>{name}</h3>
        </div>
      ))}
    </ReactCarousel>
  );
};

export default Carousel;
