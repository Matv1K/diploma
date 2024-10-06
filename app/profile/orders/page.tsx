'use client';

import React, { useState, useEffect } from 'react';

import styles from './page.module.scss';

import Link from 'next/link';
import { Button, Loader, OrderItem } from '@/components';

import { getOrders } from '@/api/orders/ordersService';

import { OrderI } from '@/types';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrders();

      setOrders(orders);
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <main className={styles.containerEmpty}>
        <Loader />
      </main>
    );
  }

  if (!orders.length) {
    return (
      <main className={styles.containerEmpty}>
        <h2>You do not have any orders yet</h2>

        <Link href='/shop'>
          <Button>Go back to shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h2>Orders</h2>

      <div className={styles.orders}>
        {orders.map(({ _id, ...props }) => (
          <OrderItem key={_id} {...props} />
        ))}
      </div>
    </main>
  );
};

export default Orders;
