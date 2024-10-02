'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import styles from './page.module.scss';

import InfiniteScroll from 'react-infinite-scroll-component';
import { InstrumentCard, Loader } from '@/components';

import { removeSeparator } from '@/utils';

import { getInstrumentsBySection } from '@/services/instruments/instrumentService';

import { BRANDS, PRICE_RANGES } from '@/app/constants';

import { InstrumentCardI } from '@/types';

const Section: React.FC = () => {
  const [instruments, setInstruments] = useState<InstrumentCardI[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const { section: instrumentsSection } = useParams();
  const sectionName = Array.isArray(instrumentsSection) ? instrumentsSection[0] : instrumentsSection;

  const fetchInstruments = async (pageNumber: number) => {
    setLoading(true);
    try {
      const newInstruments = await getInstrumentsBySection(instrumentsSection, pageNumber);

      if (newInstruments.length === 0) {
        setHasMore(false);
      } else {
        setInstruments(prev => [...prev, ...newInstruments]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching instruments:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInstruments([]);
    setPage(1);
    setHasMore(true);

    fetchInstruments(1);
  }, []);

  const loadMoreInstruments = () => {
    if (!loading && hasMore) {
      fetchInstruments(page);
    }
  };

  if (loading) {
    return (
      <main className={styles.containerEmpty}>
        <Loader />
      </main>
    );
  }

  if (!instruments.length && !loading) {
    return (
      <main className={styles.containerEmpty}>
        <h2>Currently, there are no items in this category</h2>
      </main>
    );
  }

  return (
    <main>
      <h2 className={styles.headingSection}>{removeSeparator(sectionName)}</h2>

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
          <label htmlFor='price'>Filter By:</label>

          <select id='price'>
            {PRICE_RANGES.map(range => (
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

      <InfiniteScroll
        dataLength={instruments.length}
        next={loadMoreInstruments}
        hasMore={hasMore}
        loader={<h4>Loading more instruments...</h4>}
        endMessage={<p>No more instruments to load</p>}
      >
        <div className={styles.instruments}>
          {instruments.map(({ _id, ...props }: InstrumentCardI) => (
            <InstrumentCard key={_id} id={_id} withLikeIcon {...props} />
          ))}
        </div>
      </InfiniteScroll>
    </main>
  );
};

export default Section;
