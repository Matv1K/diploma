'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import 'react-multi-carousel/lib/styles.css';
import styles from './index.module.scss';

import ReactCarousel from 'react-multi-carousel';

import { InstrumentI } from '@/types';

interface CarouselProps {
  items: (InstrumentI)[] | {name: string}[];
  isInstrumentsCarousel?: boolean;
}

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

const Carousel: React.FC<CarouselProps> = ({
  items,
  isInstrumentsCarousel,
}) => {
  const { push } = useRouter();

  const handleItemNavigation = ( section: string, name: string, instrumentType: string) => {
    if (isInstrumentsCarousel) {
      push(`/shop/${section}/${instrumentType}/${name}`);
    } else {
      push(`/shop/${name.toLocaleLowerCase()}`);
    }
  };

  return (
    <ReactCarousel
      swipeable={false}
      draggable={false}
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={10000}
      keyBoardControl
      customTransition='all .5'
      transitionDuration={500}
      containerClass={styles.carouselContainer}
      removeArrowOnDeviceType={['tablet', 'mobile']}
      itemClass={styles.carouselItemPadding}
    >
      {items.map(item => {
        const isInstrument = (item as InstrumentI)._id !== undefined;

        if (isInstrument) {
          const { _id, name, section, instrumentType } = item as InstrumentI;
          return (
            <div
              onClick={() => handleItemNavigation(section, _id, instrumentType)}
              key={_id}
              className={styles.carouselItem}
            >
              <h3>{name}</h3>
            </div>
          );
        }
        const { name } = item as { name: string };
        return (
          <div
            onClick={() => handleItemNavigation('', name, '')}
            key={name}
            className={styles.carouselItem}
          >
            <h3>{name}</h3>
          </div>
        );

      })}
    </ReactCarousel>
  );
};

export default Carousel;
