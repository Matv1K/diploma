'use client';

import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './index.module.scss';

import { FiX } from 'react-icons/fi';

import useLockScroll from '@/hooks/useLockScroll';
import useMediaQuery from '@/hooks/useMediaQuerry';

import { closeModal } from '@/features/modal/modalSlice';

interface ModalProps {
  heading?: string;
  buttonName?: string;
  onButtonClick?: () => void;
  className?: string;
  setIsModalOpened?: (_isOpen: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  heading,
  children,
  className,
  setIsModalOpened,
}) => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery('(max-width: 630px)');

  const handleCloseModal = () => {
    dispatch(closeModal());

    if (setIsModalOpened) {
      setIsModalOpened(false);
    }
  };

  useLockScroll(isMobile, '630px');

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${className}`}>
        <FiX size={24} onClick={handleCloseModal} className={styles.modalClose} />

        {heading && <h2 className={styles.modalHeading}>{heading}</h2>}

        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
