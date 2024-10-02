'use client';

import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { Button } from '@/components';

import { logOutUser } from '@/features/user/userSlice';
import { resetCart } from '@/features/instruments/instrumentsSlice';

import { RootState, AppDispatch } from '@/app/store';
import { TOAST_MESSAGES } from '@/app/constants';

interface DropdownProps {
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ className }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { push } = useRouter();

  const dispatch: AppDispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      dispatch(logOutUser());
      dispatch(resetCart());
      push('/');
      toast.success(TOAST_MESSAGES.LOG_OUT_USER);
    } catch (error) {
      console.error(error);
      toast.error('Error logging out');
    }
  };

  return (
    <div className={`${styles.dropdownMenu} ${className}`}>
      <div className={styles.dropdownHeader}>
        <h4>{user?.user.name} {user?.user.lastName}</h4>

        <p className={styles.dropdownNumber}>
          {user?.user.phoneNumber !== 0 && user?.user.phoneNumber}
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
