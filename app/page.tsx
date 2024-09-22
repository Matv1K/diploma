'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './page.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import { Carousel, Button, Modal, Input } from '@/components';

import { Piano } from '@/public/images';
import { FiSend, FiMessageCircle } from 'react-icons/fi';

import { showModal } from '@/features/modal/modalSlice';

import { getPopularIstruments, getNewInstruments} from '@/services/instruments/instrumentService';

import { ALL_SECTIONS } from './constants';

import { InputTypes, ButtonOptions } from '@/types';

const Home: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [popularInstruments, setPopularInstruments] = useState<any>([]);
  const [newInstruments, setNewInstruments] = useState<any>([]);

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
              type={InputTypes.TEXT}
              placeholder='Write your message'
            />
            <Button option={ButtonOptions.OUTILINE}>
              <FiSend size={20} />
            </Button>
          </div>
        </Modal>
      ) : (
        <Button
          option={ButtonOptions.OUTILINE}
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
