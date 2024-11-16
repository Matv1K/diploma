'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import styles from './page.module.scss';

import InfiniteScroll from 'react-infinite-scroll-component';
import { InstrumentCard, Loader } from '@/components';

import { removeSeparator } from '@/utils';

import useInstrumentsFilter from '@/hooks/useInstrumentsFilter';

import { BRANDS, PRICE_RANGES, FILTERS } from '@/app/constants';

import { InstrumentCardI } from '@/types';

const Subtype = () => {
  const { subtype } = useParams();
  const convertedSubtype = Array.isArray(subtype) ? subtype[0] : subtype;

  const { instruments, hasMore, isLoading, filters, setFilters, fetchInstruments } =
    useInstrumentsFilter({}, 'subtypeName', '', convertedSubtype);

  const handleNewOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prevFilters => ({ ...prevFilters, isNewOnly: e.target.checked }));
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prevFilters => ({ ...prevFilters, priceRange: e.target.value }));
  };

  const handleBrandNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prevFilters => ({ ...prevFilters, brand: e.target.value }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prevFilters => ({ ...prevFilters, filter: e.target.value }));
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
      <h2>{removeSeparator(convertedSubtype)[0].toUpperCase() + removeSeparator(convertedSubtype).substring(1)}</h2>
      <div className={styles.filterBar}>
        <div className={styles.filterItem}>
          <label htmlFor='brand'>Brand:</label>

          <div className={styles.selectWrapper}>
            <select className={styles.select} value={filters.brand || ''} id='brand' onChange={handleBrandNameChange}>
              <option value='All'>All</option>
              {BRANDS.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor='price'>Price Range:</label>

          <div className={styles.selectWrapper}>
            <select
              id='price' value={filters.priceRange || 'All'}
              onChange={handlePriceRangeChange}
              className={styles.select}
            >
              <option value='All'>All</option>
              {PRICE_RANGES.map(range => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor='filterBy'>Filter By:</label>

          <div className={styles.selectWrapper}>
            <select className={styles.select} id='filterBy' value={filters.filter || ''} onChange={handleFilterChange}>
              {FILTERS.map(filter => (
                <option key={filter.label} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={`${styles.filterItem} ${styles.checkboxItem}`}>
          <label htmlFor='isNew'>New</label>

          <label className={styles.label}>
            <input
              className={styles.checkbox}
              type='checkbox' id='isNew'
              checked={filters.isNewOnly || false}
              onChange={handleNewOnlyChange}
            />
          </label>
        </div>
      </div>

      <InfiniteScroll
        dataLength={instruments.length}
        next={() => fetchInstruments()}
        hasMore={hasMore}
        className={styles.instruments}
        loader={<div><Loader /></div>}
      >
        {instruments.map(({ _id, ...props }: InstrumentCardI) => (
          <InstrumentCard id={_id} key={_id} withLikeIcon {...props} />
        ))}
      </InfiniteScroll>

      {!instruments.length &&
        <div className={styles.noInstruments}>
          <h2>No instruments to display</h2>
        </div>
      }
    </main>
  );
};

export default Subtype;
