import React from 'react';

import styles from './index.module.scss';

import { OrderItemI } from '@/types';

interface OrderItemProps {
  items: OrderItemI[],
  totalPrice: number,
  status: string,
}

const OrderItem: React.FC<OrderItemProps> = ({ items, totalPrice, status }) => (
  <div className={styles.order}>
    <div className={`${styles.tableRow} ${styles.tableHeader}`}>
      <div className={`${styles.tableCell} ${styles.tableHeaderCell}`}>
        Name
      </div>
      <div className={`${styles.tableCell} ${styles.tableHeaderCell}`}>
        Color
      </div>
      <div className={`${styles.tableCell} ${styles.tableHeaderCell}`}>
        Price
      </div>
      <div className={`${styles.tableCell} ${styles.tableHeaderCell}`}>
        Amount
      </div>
    </div>

    <div>
      {items.map(({ name, price, color, amount, _id }) => (
        <div key={_id} className={styles.tableRow}>
          <div className={styles.tableCell}>{name}</div>
          <div className={styles.tableCell}>{color}</div>
          <div className={styles.tableCell}>{price}$</div>
          <div className={styles.tableCell}>{amount}</div>
        </div>
      ))}

      <div className={styles.orderData}>
        <div className={styles.orderDataRowPrice}>
          <div>Total Price:</div>

          <div className={styles.bold}>
            {totalPrice}$
          </div>
        </div>

        <div className={styles.orderDataRowStatus}>
          <div>
            Status:
          </div>

          <div className={styles.bold}>
            {status}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OrderItem;
