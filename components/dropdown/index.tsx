'use client';

import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './index.module.scss';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { Button } from '@/components';

import { logOutUser } from '@/features/user/userSlice';
import { resetCart } from '@/features/instruments/instrumentsSlice';

import { TOAST_MESSAGES } from '@/app/constants';

import { RootState, AppDispatch } from '@/app/store';

interface DropdownProps {
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ className }) => {
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      dispatch(logOutUser());
      dispatch(resetCart());

      toast.success(TOAST_MESSAGES.LOG_OUT_USER);
    } catch (error) {
      console.error(error);
      toast.error('Error logging out');
    }
  };

  return (
    <div className={`${styles.dropdownMenu} ${className}`}>
      <div className={styles.dropdownHeader}>
        <h4>{user?.name} {user?.lastName}</h4>

        <p className={styles.dropdownNumber}>
          {user?.phoneNumber}
        </p>
      </div>

      <div className={styles.dropdownLinks}>
        <Link href='/profile' className={styles.dropdownLink}>
          My profile
        </Link>

        <Link href='/profile/orders' className={styles.dropdownLink}>
          Order history
        </Link>
      </div>

      <Button onClick={handleLogOut}>Sign out</Button>
    </div>
  );
};

export default memo(Dropdown);
