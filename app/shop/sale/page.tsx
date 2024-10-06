'use client';

import React, { useState, useEffect } from 'react';

import styles from './page.module.scss';

import { InstrumentCard } from '@/components';

import { getInstrumentsOnSale } from '@/api/instruments/instrumentService';

import { BRANDS, PRICE_RANGES } from '@/app/constants';

import { InstrumentCardI } from '@/types';

const Sale: React.FC = () => {
  const [instruments, setInstruments] = useState<InstrumentCardI[]>([]);

  useEffect(() => {
    const fetchInstruments = async () => {
      const instruments = await getInstrumentsOnSale();

      setInstruments(instruments);
    };

    fetchInstruments();
  }, []);

  return (
    <main>
      <h2>Sale</h2>

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

      <div className={styles.instruments}>
        {instruments.map(({ _id, ...props }: InstrumentCardI) => (
          <InstrumentCard key={_id} id={_id} {...props} withLikeIcon />
        ))}
      </div>
    </main>
  );
};

export default Sale;
