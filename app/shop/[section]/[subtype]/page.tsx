'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import styles from './page.module.scss';

import { InstrumentCard } from '@/components';

import { removeSeparator } from '@/utils';

import { getInstrumentBySubtype } from '@/services/instruments/instrumentService';

import { InstrumentCardI } from '@/types';

const brands = ['Yamaha', 'Gibson', 'Fender', 'Roland'];
const priceRanges = [
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: 'Above $1000', min: 1000, max: Infinity },
];

const Subtype = () => {
  const [instruments, setInstruments] = useState([]);

  const { subtype } = useParams();

  const convertedSubtype = Array.isArray(subtype) ? subtype[0] : subtype;

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const data = await getInstrumentBySubtype(convertedSubtype);
        setInstruments(data);
      } catch (error) {
        console.error(`Error fetching instruments: ${error}`);
      }
    };

    if (convertedSubtype) {
      fetchInstruments();
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
            {priceRanges.map(range => (
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
            id={_id}
            key={_id}
            name={name}
            price={price}
            section={section}
            instrumentType={instrumentType}
            isNew={isNew}
            colors={colors}
            image={image}
            brandName={brandName}
            withLikeIcon
          />
        ))}
      </div>
    </main>
  );
};

export default Subtype;