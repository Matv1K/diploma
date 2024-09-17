"use client";

import React, { useState, useEffect } from "react";

import styles from "./page.module.scss";

import { getOrders } from "@/services/ordersService/ordersService";

import { OrderI } from "@/types";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderI[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrders();

      setOrders(orders);
    };

    fetchOrders();
  }, []);

  return (
    <main>
      <h2>Orders</h2>

      <div className={styles.orders}>
        {orders.map(({ _id, items, status, totalPrice }) => {
          return (
            <div key={_id}>
              <h4 className={styles.headingOrder}>Order {_id}</h4>

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
                  </tr>
                </thead>

                <tbody>
                  {items.map(({ name, price, color, _id }) => (
                    <tr key={_id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{name}</td>
                      <td className={styles.tableCell}>{color}</td>
                      <td className={styles.tableCell}>{price}</td>
                    </tr>
                  ))}

                  <tr className={styles.tableRow}>
                    <td className={styles.tableCell} colSpan={2}>
                      Total Price:
                    </td>

                    <td className={styles.tableCell}>{totalPrice}$</td>
                  </tr>

                  <tr className={styles.tableRow}>
                    <td className={styles.tableCell} colSpan={2}>
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
