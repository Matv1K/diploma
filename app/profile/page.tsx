// "use client";

import React from "react";

import styles from "./page.module.scss";

const ORDERS = [
  {
    id: "21ds255",
    items: [
      { id: 1, name: "Fender cd-60", price: 999, color: "yellow" },
      { id: 2, name: "Martin 5d", price: 499, color: "brown" },
    ],
    state: "delivered",
  },
  {
    id: "21ds256",
    items: [{ id: 1, name: "Cort d350", price: 399, color: "yellow" }],
    state: "delivered",
  },
];

const Profile: React.FC = () => {
  return (
    <main>
      <h2>My profile</h2>

      <div className={styles.orders}>
        {ORDERS.map(({ id, items, state }) => {
          return (
            <>
              <h4 className={styles.headingOrder}>Order {id}</h4>
              <table className={styles.order} key={id}>
                {items.map(({ name, price, color, id }) => {
                  return (
                    <tbody>
                      <tr key={id}>
                        <th className={styles.tableCell}>{color}</th>
                        <th className={styles.tableCell}>{name}</th>
                        <th className={styles.tableCell}>{price}$</th>
                        <th className={styles.tableCell}>{state}</th>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </>
          );
        })}
      </div>
    </main>
  );
};

export default Profile;
