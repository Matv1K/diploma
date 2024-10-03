'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from './page.module.scss';

import InfiniteScroll from 'react-infinite-scroll-component';
import { InstrumentCard, Button, Modal, Input, Loader } from '@/components';

import { FiSend, FiMessageCircle } from 'react-icons/fi';

import { showModal } from '@/features/modal/modalSlice';

import { getInstruments } from '@/services/instruments/instrumentService';

import { BRANDS, PRICE_RANGES, FILTERS } from '@/app/constants';

import { InstrumentCardI, ButtonOptions, InputTypes } from '@/types';

const Shop: React.FC = () => {
  const [instruments, setInstruments] = useState<InstrumentCardI[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const fetchMoreInstruments = async () => {
    try {
      const { instruments: newInstruments, hasMore } = await getInstruments(page);

      if (newInstruments.length === 0) {
        setHasMore(false);
      }

      setInstruments(prevInstruments => [...prevInstruments, ...newInstruments]);
      setHasMore(hasMore);
      setPage(prevPage => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching instruments:', error);
      setHasMore(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreInstruments();
  }, []);

  const handleOpenModal = () => {
    dispatch(showModal());

    setIsModalOpened(true);
  };

  if (isLoading) {
    return (
      <main className={styles.containerEmpty}>
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
            {BRANDS.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor='price'>Price Range:</label>

          <select id='price'>
            {PRICE_RANGES.map(range => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor='filterBy'>Filter By:</label>

          <select id='filterBy'>
            {FILTERS.map(filter => (
              <option key={filter.label} value={filter.label}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.filterItem} ${styles.checkboxItem}`}>
          <label htmlFor='isNew'>New Only</label>
          <input type='checkbox' id='isNew' />
        </div>
      </div>

      <InfiniteScroll
        className={styles.instruments}
        dataLength={instruments.length}
        next={fetchMoreInstruments}
        hasMore={hasMore}
        loader={<div><Loader /></div>}
      >
        {instruments.map(({ _id, ...props }: InstrumentCardI) => (
          <InstrumentCard key={_id} id={_id} withLikeIcon {...props} />
        ))}
      </InfiniteScroll>

      {isModalOpened ? (
        <Modal setIsModalOpened={setIsModalOpened} buttonName='Send' heading='Support'>
          <div>Ask your questions here.</div>

          <div className={styles.modalData}>
            <Input
              className={styles.modalInput}
              type={InputTypes._TEXT}
              placeholder='Write your message'
            />

            <Button option={ButtonOptions._OUTILINE}>
              <FiSend size={24} />
            </Button>
          </div>
        </Modal>
      ) : (
        <Button option={ButtonOptions._OUTILINE} onClick={handleOpenModal} className={styles.buttonSupportModal}>
          <FiMessageCircle size={24} />
        </Button>
      )}
    </main>
  );
};

export default Shop;
