'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './index.module.scss';

import { toast } from 'react-toastify';
import Link from 'next/link';
import { Button, Modal } from '@/components';
import { FiTrash2 } from 'react-icons/fi';

import { RootState } from '@/app/store';
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
  image,
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [localAmount, setLocalAmount] = useState(amount); // Local state to track amount
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  const handleIncreaseCount = async () => {
    // Increase amount in the UI immediately
    setLocalAmount(localAmount + 1);

    try {
      dispatch(increaseItemAmount(cartItemId)); // Optimistic UI update in Redux

      if (user) {
        await increaseAmount(cartItemId); // Update backend for authenticated user
      } else {
        const cart = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
        const updatedCart = cart.map((item: any) => {
          if (item.cartItemId === cartItemId) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));

        // Trigger event to notify that session storage has changed
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Failed to increase item amount:', error);
    }
  };

  const handleDecreaseCount = async () => {
    if (localAmount > 1) {
      setLocalAmount(localAmount - 1); // Immediately update UI

      try {
        dispatch(decreaseItemAmount(cartItemId)); // Optimistic UI update in Redux

        if (user) {
          await decreaseAmount(cartItemId); // Update backend for authenticated user
        } else {
          const cart = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
          const updatedCart = cart.map((item: any) => {
            if (item.cartItemId === cartItemId) {
              return { ...item, amount: item.amount - 1 };
            }
            return item;
          });
          sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));

          window.dispatchEvent(new Event('cartUpdated'));
        }
      } catch (error) {
        console.error('Failed to decrease item amount:', error);
      }
    }
  };

  const handleRemoveItem = async () => {
    try {
      if (user) {
        await removeCartItem(cartItemId);
      } else {
        const cart = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
        const updatedCart = cart.filter((item: any) => item.cartItemId !== cartItemId);
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));

        window.dispatchEvent(new Event('cartUpdated'));
      }
      dispatch(removeItem(cartItemId));
      toast.success('Item has been removed from the cart');
    } catch (error) {
      toast.error('Failed to remove item');
    } finally {
      setIsModalOpened(false);
    }
  };

  // Listen for cart updates in sessionStorage
  useEffect(() => {
    const handleCartUpdate = () => {
      const cart = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
      const currentItem = cart.find((item: any) => item.cartItemId === cartItemId);

      if (currentItem) {
        setLocalAmount(currentItem.amount); // Sync local state with sessionStorage
      }
    };

    // Listen to the custom event
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [cartItemId]);

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
              <FiTrash2 className={styles.iconTrash} size={24} />
            </Button>
            <Button className={styles.modalButton} onClick={() => setIsModalOpened(false)}>Cancel</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default InstrumentRow;
