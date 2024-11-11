'use client';

import React, { useState, useEffect } from 'react';

import styles from './page.module.scss';

import InfiniteScroll from 'react-infinite-scroll-component';
import { InstrumentCard, Button, Modal, Input, Loader } from '@/components';

import { FiSend } from 'react-icons/fi';

import {
  getInstruments,
  getNewInstruments,
  getInstrumentsByPriceRange,
  getInstrumentsByBrand,
  getInstrumentsByFilter,
} from '@/api/instruments/instrumentService';

import { BRANDS, PRICE_RANGES, FILTERS } from '@/app/constants';

import { InstrumentCardI, ButtonOptions, InputTypes } from '@/types';

const Shop: React.FC = () => {
  const [instruments, setInstruments] = useState<InstrumentCardI[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewOnly, setIsNewOnly] = useState<boolean>(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const fetchInstruments = async (reset = false) => {
    try {
      setIsLoading(true);
      let newInstrumentsData: InstrumentCardI[] = [];

      if (isNewOnly) {
        const data = await getNewInstruments();
        newInstrumentsData = data || [];
        setHasMore(false);
      } else if (selectedPriceRange !== 'All') {
        const selectedRange = PRICE_RANGES.find(range => range.label === selectedPriceRange);
        if (selectedRange) {
          const { min, max } = selectedRange;
          const data = await getInstrumentsByPriceRange(min, max);
          newInstrumentsData = data || [];
        }
        setHasMore(false);
      } else if (selectedBrand) {
        const data = await getInstrumentsByBrand(selectedBrand);
        newInstrumentsData = data || [];
        setHasMore(false);
      } else if (selectedFilter) {
        const data = await getInstrumentsByFilter(selectedFilter);
        newInstrumentsData = data || [];
        setHasMore(false);
      } else {
        const { instruments: newInstruments, hasMore } = await getInstruments(reset ? 1 : page);
        newInstrumentsData = newInstruments;
        setHasMore(hasMore);
      }

      setInstruments(prevInstruments =>
        reset ? newInstrumentsData : [...prevInstruments, ...newInstrumentsData]);
      setPage(prevPage => (reset ? 2 : prevPage + 1));
    } catch (error) {
      console.error('Error fetching instruments:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstruments(true);
  }, [isNewOnly, selectedPriceRange, selectedBrand, selectedFilter]);

  const handleNewOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNewOnly(e.target.checked);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriceRange(e.target.value);
  };

  const handleBrandNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  if (isLoading && instruments.length === 0) {
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

          <select id='brand' onChange={handleBrandNameChange}>
            <option value='All'>All</option>
            {BRANDS.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor='price'>Price Range:</label>

          <select id='price' value={selectedPriceRange} onChange={handlePriceRangeChange}>
            <option value='All'>All</option>
            {PRICE_RANGES.map(range => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor='filterBy'>Filter By:</label>

          <select id='filterBy' onChange={handleFilterChange}>
            {FILTERS.map(filter => (
              <option key={filter.label} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.filterItem} ${styles.checkboxItem}`}>
          <label htmlFor='isNew'>New Only</label>
          <input type='checkbox' id='isNew' checked={isNewOnly} onChange={handleNewOnlyChange} />
        </div>
      </div>

      <InfiniteScroll
        className={styles.instruments}
        dataLength={instruments.length}
        next={() => {
          if (!isNewOnly && selectedPriceRange === 'All') {
            fetchInstruments();
          }
        }}
        hasMore={hasMore}
        loader={<div><Loader /></div>}
      >
        {instruments.map(({ _id, ...props }: InstrumentCardI) => (
          <InstrumentCard key={_id} id={_id} withLikeIcon {...props} />
        ))}
      </InfiniteScroll>

      {isModalOpened && (
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
      )}
    </main>
  );
};

export default Shop;
