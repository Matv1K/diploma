'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './index.module.scss';

import { toast } from 'react-toastify';

import Image from 'next/image';
import Link from 'next/link';
import { Button, Modal } from '@/components';

import { FiTrash2 } from 'react-icons/fi';

import { removeItem, increaseItemAmount, decreaseItemAmount } from '@/features/instruments/instrumentsSlice';

import { removeCartItem, increaseAmount, decreaseAmount } from '@/services/cart/cartService';

import { TOAST_MESSAGES } from '@/app/constants';

import { RootState } from '@/app/store';
import { CartItemWithLocalIdI } from '@/types';

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
  image,
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [localAmount, setLocalAmount] = useState(amount);

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    setLocalAmount(amount);
  }, [amount]);

  const handleIncreaseCount = async () => {
    const prevAmount = localAmount;
    setLocalAmount(localAmount + 1);

    try {
      dispatch(increaseItemAmount(cartItemId));

      if (user) {
        await increaseAmount(cartItemId);
      } else {
        const cart = JSON.parse(sessionStorage.getItem('cartItems') || '[]');

        const updatedCart = cart.map((item: CartItemWithLocalIdI) =>
          item.cartItemId === cartItemId ? { ...item, amount: item.amount + 1 } : item);

        sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Failed to increase item amount:', error);
      setLocalAmount(prevAmount);
    }
  };

  const handleDecreaseCount = async () => {
    if (localAmount > 1) {
      const prevAmount = localAmount;
      setLocalAmount(localAmount - 1);

      try {
        dispatch(decreaseItemAmount(cartItemId));

        if (user) {
          await decreaseAmount(cartItemId);
        } else {
          const cart = JSON.parse(sessionStorage.getItem('cartItems') || '[]');

          const updatedCart = cart.map((item: CartItemWithLocalIdI) =>
            item.cartItemId === cartItemId ? { ...item, amount: item.amount - 1 } : item);

          sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));

          window.dispatchEvent(new Event('cartUpdated'));
        }
      } catch (error) {
        console.error('Failed to decrease item amount:', error);
        setLocalAmount(prevAmount);
      }
    }
  };

  const handleRemoveItem = async () => {
    try {
      if (user) {
        await removeCartItem(cartItemId);
        dispatch(removeItem(cartItemId));
      } else {
        const cart = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
        const updatedCart = cart.filter((item: CartItemWithLocalIdI) => item.cartItemId !== cartItemId);

        sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));

        window.dispatchEvent(new Event('cartUpdated'));
      }

      toast.success(TOAST_MESSAGES.REMOVE_CART_ITEM_SUCCESS);
    } catch {
      toast.error('Failed to remove item');
    } finally {
      setIsModalOpened(false);
    }
  };

  useEffect(() => {
    const handleCartUpdate = () => {
      const cart = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
      const currentItem = cart.find((item: CartItemWithLocalIdI) => item.cartItemId === cartItemId);
      if (currentItem) setLocalAmount(currentItem.amount);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [cartItemId]);

  return (
    <>
      <div className={styles.row}>
        <div className={styles.cell}>
          <div className={styles.cellContainer}>
            <Image alt='' width={50} height={50} src={image} className={styles.image} />

            <Link href={`/shop/${section}/${instrumentType}/${instrumentId}`} className={styles.link}>
              {name} / <span className={styles.color}>{color}</span>
            </Link>
          </div>
        </div>

        <div className={styles.cell}>
          <Button className={styles.operator} onClick={handleDecreaseCount}>-</Button>
          {localAmount}
          <Button className={styles.operator} onClick={handleIncreaseCount}>+</Button>
        </div>

        <div className={styles.cell}>{price}$</div>

        <div className={styles.cell}>
          <FiTrash2 onClick={() => setIsModalOpened(true)} className={styles.iconTrash} size={24} />
        </div>
      </div>

      {isModalOpened && (
        <Modal heading='Remove' setIsModalOpened={setIsModalOpened}>
          <p className={styles.modalText}>Are you sure you want to remove the item from the cart?</p>
          <div className={styles.modalButtons}>
            <Button className={styles.modalButton} onClick={handleRemoveItem}>
              Remove Item
            </Button>
            <Button className={styles.modalButton} onClick={() => setIsModalOpened(false)}>Cancel</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default InstrumentRow;
