'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { Button } from '@/components';

import { logOutUser } from '@/features/user/userSlice';

import { RootState, AppDispatch } from '@/app/store';

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
      push('/');
      toast.success('Log out');
    } catch (error) {
      console.error(error);
      toast.error('Error loggin out');
    }
  };

  return (
    <div className={`${styles.dropdownMenu} ${className}`}>
      <div className={styles.dropdownHeader}>
        <h4>{user?.name} {user?.lastName}</h4>
        <p className={styles.dropdownNumber}>
          {user?.phoneNumber !== 0 && user?.phoneNumber}
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

export default Dropdown;
