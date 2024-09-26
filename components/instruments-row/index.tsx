'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './index.module.scss';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { Button, Modal } from '@/components';

import { FiTrash2 } from 'react-icons/fi';

import { removeItem, increaseItemAmount, decreaseItemAmount } from '@/features/instruments/instrumentsSlice';

import { removeCartItem, increaseAmount, decreaseAmount } from '@/services/cart/cartService';

interface InstrumentRowProps {
  instrumentId: string;
  cartItemId: string;
  section: string;
  amount: number;
  color: string;
  price: number;
  name: string;
  image: string;
  instrumentType: string;
}

const InstrumentRow: React.FC<InstrumentRowProps> = ({
  section,
  cartItemId,
  instrumentId,
  instrumentType,
  name,
  color,
  price,
  amount,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  image,
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const dispatch = useDispatch();

  const handleIncreaseCount = async () => {
    try {
      await increaseAmount(cartItemId);
      dispatch(increaseItemAmount(cartItemId));
    } catch (error) {
      console.error('Failed to increase item amount:', error);
    }
  };

  const handleDecreaseCount = async () => {
    try {
      await decreaseAmount(cartItemId);
      dispatch(decreaseItemAmount(cartItemId));
    } catch (error) {
      console.error('Failed to decrease item amount:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  const handleRemoveItem = async () => {
    try {
      await removeCartItem(cartItemId);
      dispatch(removeItem(cartItemId));

      toast.success('Item has been removed from the cart');
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  return (
    <>
      <div className={styles.row}>
        <div className={`${styles.cell}`}>
          <div className={styles.cellContainer}>
            <div className={styles.image} />

            <Link className={styles.link} href={`/shop/${section}/${instrumentType}/${instrumentId}`}>
              {name} / <span className={styles.color}>{color}</span>
            </Link>
          </div>
        </div>

        <div className={styles.cell}>
          <Button className={styles.operator} onClick={handleDecreaseCount}>-</Button>
          {amount}
          <Button className={styles.operator} onClick={handleIncreaseCount}>+</Button>
        </div>

        <div className={styles.cell}>{price}$</div>

        <div className={styles.cell}>
          <FiTrash2 onClick={handleOpenModal} className={styles.iconTrash} size={24} />
        </div>
      </div>

      {isModalOpened && (
        <Modal heading='Remove' setIsModalOpened={setIsModalOpened}>

          <p className={styles.modalText}>Are you sure you want to remove the item from the cart?</p>

          <div className={styles.modalButtons}>
            <Button className={styles.modalButton} onClick={handleRemoveItem}>
              <FiTrash2 className={styles.iconTrash} size={24} />
            </Button>

            <Button className={styles.modalButton} onClick={handleCloseModal}>Cancel</Button>
          </div>
        </Modal>
      )}
    </>

  );
};

export default InstrumentRow;
