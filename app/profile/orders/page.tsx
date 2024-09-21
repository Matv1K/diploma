"use client";

import React, { useState, useEffect } from "react";

import styles from "./page.module.scss";

import Link from "next/link";
import { Button, Loader } from "@/components";

import { getOrders } from "@/services/orders/ordersService";

import { OrderI } from "@/types";

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
      <main>
        <Loader />
      </main>
    );
  }

  if (!orders.length) {
    return (
      <main className={styles.containerEmpty}>
        <h2>You do not have any orders yet</h2>

        <Link href="/shop">
          <Button>Go back to shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h2>Orders</h2>

      <div className={styles.orders}>
        {orders.map(({ _id, items, status, totalPrice }) => {
          return (
            <div key={_id}>
              <table className={styles.order}>
                <thead>
                  <tr className={styles.tableRow}>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      Name
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      Color
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      Price
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map(({ name, price, color, amount, _id }) => (
                    <tr key={_id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{name}</td>
                      <td className={styles.tableCell}>{color}</td>
                      <td className={styles.tableCell}>{price}</td>
                      <td className={styles.tableCell}>{amount}</td>
                    </tr>
                  ))}

                  <tr className={styles.tableRow}>
                    <td className={styles.tableCell} colSpan={3}>
                      Total Price:
                    </td>

                    <td className={styles.tableCell}>{totalPrice}$</td>
                  </tr>

                  <tr className={styles.tableRow}>
                    <td className={styles.tableCell} colSpan={3}>
                      Status:
                    </td>

                    <td className={styles.tableCell}>{status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Orders;
