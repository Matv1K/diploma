'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './page.module.scss';

import { InstrumentCard } from '@/components';
import { removeSeparator } from '@/utils';

import { getInstrumentsBySection } from '@/services/instruments/instrumentService';

import { InstrumentI } from '@/types';

const brands = ['Yamaha', 'Gibson', 'Fender', 'Roland'];
const priceRanges = [
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: 'Above $1000', min: 1000, max: Infinity },
];

const Section: React.FC = () => {
  const [instruments, setInstruments] = useState<InstrumentI[]>([]);
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
        // If no instruments were found, set hasMore to false
        setHasMore(false);
      } else {
        // Update state with the new instruments
        setInstruments(prev => [...prev, ...newInstruments]);
        setPage(prevPage => prevPage + 1); // Increment page number for next fetch
      }
    } catch (error) {
      console.error('Error fetching instruments:', error);
      setHasMore(false); // If an error occurs, assume no more data
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    setInstruments([]); // Reset instruments when the section changes
    setPage(1); // Reset the page count
    setHasMore(true); // Allow fetching for new section

    fetchInstruments(1);
  }, []);

  const loadMoreInstruments = () => {
    if (!loading && hasMore) {
      fetchInstruments(page);
    }
  };

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

      <InfiniteScroll
        dataLength={instruments.length} // Length of the current data
        next={loadMoreInstruments} // Method to load more data
        hasMore={hasMore} // Condition to check if more data is available
        loader={<h4>Loading more instruments...</h4>} // Loader component
        endMessage={<p>No more instruments to load</p>} // End message when no more items to load
      >
        <div className={styles.instruments}>
          {instruments.map(({ _id, price, name, section, instrumentType, isNew, image, colors, brandName }: InstrumentI) => (
            <InstrumentCard
              key={_id}
              id={_id}
              price={price}
              name={name}
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
      </InfiniteScroll>
    </main>
  );
};

export default Section;
