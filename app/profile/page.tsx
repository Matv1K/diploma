"use client";

import React from "react";

import styles from "./page.module.scss";

import { calculateTotalPrice } from "@/utils";

import { ORDERS } from "../constants";

const Profile: React.FC = () => {
  return (
    <main>
      <h2>My Profile</h2>

      <p className={styles.discount}>Your personal discount is: 5%</p>

      <div className={styles.orders}>
        {ORDERS.map(({ id, items, state }) => {
          const totalPrice = calculateTotalPrice(items);

          return (
            <div key={id}>
              <h4 className={styles.headingOrder}>Order {id}</h4>

              <table className={styles.order}>
                <thead>
                  <tr>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      Color
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      Name
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      Price
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map(({ name, price, color, id }) => (
                    <tr key={id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{color}</td>
                      <td className={styles.tableCell}>{name}</td>
                      <td className={styles.tableCell}>{price}$</td>
                      <td className={styles.tableCell}>{state}</td>
                    </tr>
                  ))}

                  <tr>
                    <td className={styles.tableCell} colSpan={3}>
                      Total Price:
                    </td>

                    <td className={styles.tableCell}>{totalPrice}$</td>
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

export default Profile;
