'use client';

import React, { useEffect, useState } from 'react';

import styles from './page.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import { Carousel, Button, Modal, Input } from '@/components';

import { FiSend } from 'react-icons/fi';
import { Piano } from '@/public/images';

import { getPopularIstruments, getNewInstruments } from '@/api/instruments/instrumentService';

import { InputTypes, ButtonOptions, InstrumentI } from '@/types';

const Home: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [popularInstruments, setPopularInstruments] = useState<InstrumentI[]>([]);
  const [newInstruments, setNewInstruments] = useState<InstrumentI[]>([]);

  useEffect(() => {
    const fetchInstruments = async () => {
      const popularInstruments = await getPopularIstruments();
      const newInstruments = await getNewInstruments();

      setPopularInstruments(popularInstruments);
      setNewInstruments(newInstruments);
    };

    fetchInstruments();
  }, []);

  return (
    <main>
      <div className={styles.homeBlock}>
        <h1 className={styles.headingHome}>Best platform for aspiring musicians</h1>

        <Image
          className={styles.homeImage}
          src={Piano}
          alt='piano'
          width={200}
          height={200}
          priority
        />
      </div>

      <div className={styles.homeSections}>
        <div>
          <h2>Sales</h2>

          <Link className={styles.linkSale} href='/shop/sale'>
            <div className={styles.sectionSale}>
              <span>Top quality brands on sale up to 70%</span>
            </div>
          </Link>
        </div>

        <div>
          <h2>Most popular items</h2>
          <Carousel items={popularInstruments} isInstrumentsCarousel />
        </div>

        <div>
          <h2>Best Studio Equipment</h2>

          <Link className={styles.linkSale} href='/shop/studio-equipment'>
            <div className={`${styles.sectionSale} ${styles.sectionEquipment}`}>
              <span>On Musify you can find best studio equipment and much more!</span>
            </div>
          </Link>
        </div>

        <div>
          <h2>New items</h2>

          <Carousel items={newInstruments} isInstrumentsCarousel />
        </div>
      </div>

      {isModalOpened && (
        <Modal
          setIsModalOpened={setIsModalOpened}
          buttonName='Send'
          heading='Support'
          className={styles.modal}
        >
          Ask your questions here.
          <div className={styles.actionData}>
            <Input
              className={styles.messageInput}
              type={InputTypes._TEXT}
              placeholder='Write your message'
            />
            <Button option={ButtonOptions._OUTILINE}>
              <FiSend size={20} />
            </Button>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default Home;
