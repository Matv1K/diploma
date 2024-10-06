'use client';

import React, { useState, useEffect } from 'react';

import styles from './page.module.scss';

import Link from 'next/link';
import { Button, InstrumentCard, Loader } from '@/components';

import { getLikedItems } from '@/api/liked/likedService';

import { InstrumentCardI } from '@/types';

const Liked: React.FC = () => {
  const [likedItems, setLikedItems] = useState<InstrumentCardI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLikedItems = async () => {
      const items = await getLikedItems();

      setLikedItems(items);
      setIsLoading(false);
    };

    fetchLikedItems();
  }, []);

  if (isLoading) {
    return (
      <main className={styles.containerEmpty}>
        <Loader />
      </main>
    );
  }

  if (!likedItems.length) {
    return (
      <main className={styles.containerEmpty}>
        <h2>You did not like anything yet</h2>

        <Link href='/shop'>
          <Button>Go back to shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h2>Liked Items</h2>

      <div className={styles.table}>
        {likedItems.map(({ _id, instrumentId, ...props }: InstrumentCardI) => (
          <InstrumentCard key={_id} id={instrumentId} withLikeIcon {...props} />
        ))}
      </div>
    </main>
  );
};

export default Liked;
