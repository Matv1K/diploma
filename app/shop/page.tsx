'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from './page.module.scss';

import { InstrumentCard, Button, Modal, Input, Loader } from '@/components';

import { FiSend, FiMessageCircle } from 'react-icons/fi';

import { showModal } from '@/features/modal/modalSlice';

import { getInstruments } from '@/services/instruments/instrumentService';

import { InstrumentCardI, ButtonOptions, InputTypes } from '@/types';

const brands = ['Yamaha', 'Gibson', 'Fender', 'Roland'];
const priceRanges = [
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: 'Above $1000', min: 1000, max: Infinity },
];
const filters = [
  { label: 'By popularity' },
  { label: 'By rating' },
  { label: 'The most expensive' },
  { label: 'The cheapest' },
];

const Shop: React.FC = () => {
  const [instruments, setInstruments] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInstruments = async () => {
      const instruments = await getInstruments();
      setInstruments(instruments);

      setIsLoading(false);
    };

    fetchInstruments();
  }, [instruments]);

  const handleOpenModal = () => {
    dispatch(showModal());
    setIsModalOpened(true);
  };

  if (isLoading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  return (
    <main>
      <h2>Shop</h2>

      <div className={styles.filterBar}>
        <div className={styles.filterItem}>
          <label htmlFor='brand'>Brand:</label>
          <select id='brand'>
            <option value=''>All</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor='price'>Price Range:</label>
          <select id='price'>
            {priceRanges.map(range => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor='price'>Filter By:</label>
          <select id='price'>
            {filters.map(range => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.filterItem} ${styles.checkboxItem}`}>
          <label htmlFor='isNew'>New Only</label>
          <input type='checkbox' id='isNew' />
        </div>
      </div>

      <div className={styles.instruments}>
        {instruments.map(({
          _id,
          price,
          name,
          section,
          instrumentType,
          isNew,
          image,
          colors,
          brandName,
        }: InstrumentCardI) => (
          <InstrumentCard
            key={_id}
            id={_id}
            price={price}
            name={name}
            section={section}
            instrumentType={instrumentType}
            isNew={isNew}
            image={image}
            colors={colors}
            brandName={brandName}
            withLikeIcon
          />
        ))}
      </div>

      {isModalOpened ? (
        <Modal
          setIsModalOpened={setIsModalOpened}
          buttonName='Send'
          heading='Support'
        >
          <div>Ask your questions here.</div>

          <div className={styles.modalData}>
            <Input
              className={styles.modalInput}
              type={InputTypes.TEXT}
              placeholder='Write your message'
            />

            <Button option={ButtonOptions.OUTILINE}>
              <FiSend size={24} />
            </Button>
          </div>
        </Modal>
      ) : (
        <Button
          option={ButtonOptions.OUTILINE}
          onClick={handleOpenModal}
          className={styles.buttonSupportModal}
        >
          <FiMessageCircle size={24} />
        </Button>
      )}
    </main>
  );
};

export default Shop;
