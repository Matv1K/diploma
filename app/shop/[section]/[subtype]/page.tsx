'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import styles from './page.module.scss';

import InfiniteScroll from 'react-infinite-scroll-component';
import { InstrumentCard, Loader } from '@/components';

import { removeSeparator } from '@/utils';

import { getInstrumentBySubtype } from '@/services/instruments/instrumentService';

import { BRANDS, PRICE_RANGES } from '@/app/constants';

import { InstrumentCardI } from '@/types';

const Subtype = () => {
  const [instruments, setInstruments] = useState<InstrumentCardI[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { subtype } = useParams();

  const convertedSubtype = Array.isArray(subtype) ? subtype[0] : subtype;

  const fetchInstruments = async (currentPage: number) => {
    try {
      const { instruments: newInstruments, hasMore: moreData } = await getInstrumentBySubtype(convertedSubtype, currentPage);

      if (newInstruments.length === 0) {
        setHasMore(false);
      }

      setInstruments(prevInstruments => [...prevInstruments, ...newInstruments]);
      setHasMore(moreData);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error(`Error fetching instruments: ${error}`);
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (convertedSubtype) {
      fetchInstruments(1);
    }
  }, [convertedSubtype]);

  if (!instruments.length) {
    return (
      <main className={styles.containerEmpty}>
        <h2>Currently, there are no items in this category</h2>
      </main>
    );
  }

  return (
    <main>
      <h2>{removeSeparator(convertedSubtype)[0].toUpperCase() + removeSeparator(convertedSubtype).substring(1)}</h2>

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
        next={() => fetchInstruments(page)}
        hasMore={hasMore}
        className={styles.instruments}
        loader={
          <div>
            <Loader />
          </div>}
      >
        {instruments.map(({ _id, ...props }: InstrumentCardI) => (
          <InstrumentCard id={_id} key={_id} withLikeIcon {...props} />
        ))}
      </InfiniteScroll>
    </main>
  );
};

export default Subtype;
