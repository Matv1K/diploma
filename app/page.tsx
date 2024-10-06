'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './page.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import { Carousel, Button, Modal, Input } from '@/components';

import { FiSend, FiMessageCircle } from 'react-icons/fi';
import { Piano } from '@/public/images';

import { showModal } from '@/features/modal/modalSlice';

import { getPopularIstruments, getNewInstruments } from '@/api/instruments/instrumentService';

import { ALL_SECTIONS } from '@/app/constants';

import { InputTypes, ButtonOptions, InstrumentI } from '@/types';

const Home: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [popularInstruments, setPopularInstruments] = useState<InstrumentI[]>([]);
  const [newInstruments, setNewInstruments] = useState<InstrumentI[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInstruments = async () => {
      const popularInstruments = await getPopularIstruments();
      const newInstruments = await getNewInstruments();

      setPopularInstruments(popularInstruments);
      setNewInstruments(newInstruments);
    };

    fetchInstruments();
  }, []);

  const handleOpenModal = () => {
    dispatch(showModal());
    setIsModalOpened(true);
  };

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
          <h2>Sales!</h2>

          <Link className={styles.linkSale} href='/shop/sale'>
            <div className={styles.sectionSale}>
              <span>Top quality brands on sale up to 70%</span>
            </div>
          </Link>
        </div>

        <div>
          <h2>Most popular sections</h2>
          <Carousel items={ALL_SECTIONS} />
        </div>

        <div>
          <h2>Most popular items</h2>
          <Carousel items={popularInstruments} isInstrumentsCarousel />
        </div>

        <div className={styles.homeBlock}>
          <Image
            className={styles.homeImage}
            src={Piano}
            alt='piano'
            width={200}
            height={180}
            priority
          />

          <h2 className={styles.headingHome}>
            Check out our{' '}
            <Link href='/events' className={styles.eventsLink}>
              events
            </Link>
          </h2>
        </div>

        <div>
          <h2>New items</h2>

          <Carousel items={newInstruments} isInstrumentsCarousel />
        </div>
      </div>

      {isModalOpened ? (
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
      ) : (
        <Button
          option={ButtonOptions._OUTILINE}
          onClick={handleOpenModal}
          className={styles.buttonSupport}
        >
          <FiMessageCircle size={24} />
        </Button>
      )}
    </main>
  );
};

export default Home;
