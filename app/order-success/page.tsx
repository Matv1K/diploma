'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './page.module.scss';

import { toast } from 'react-toastify';

import { Button } from '@/components';

const OrderSuccess = () => {
  const { push } = useRouter();

  useEffect(() => {
    toast.success('Order was successful! 🎉');
  }, []);

  const handleNavigation = () => {
    push('/');
  };

  return (
    <main>
      <h1>Order Status</h1>

      <div className={styles.info}>
        <p>Payment succeeded!</p> <Button onClick={handleNavigation}>Go back to shopping</Button>
      </div>
    </main>
  );
};

export default OrderSuccess;
