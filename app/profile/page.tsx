'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import 'react-phone-input-2/lib/style.css';
import styles from './page.module.scss';

import Link from 'next/link';
import { Input, Button, Select, Loader } from '@/components';
import PhoneInput from 'react-phone-input-2';

import { getNames } from 'country-list';

import useCurrentUser from '@/hooks/useCurrentUser';

import { setUser, updateUser } from '@/features/user/userSlice';

import { updateCurrentUser } from '@/services/users/userService';

import { InputTypes } from '@/types';

const Profile: React.FC = () => {
  const { user: currentUser, loading } = useCurrentUser();
  const [updatedUserData, setUpdatedUserData] = useState({
    name: currentUser?.name || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phoneNumber: currentUser?.phoneNumber || '',
    address: {
      country: currentUser?.address?.country || '',
      city: currentUser?.address?.city || '',
      address: currentUser?.address?.address || '',
    },
  });

  const dispatch = useDispatch();

  const countries = getNames();

  useEffect(() => {
    if (currentUser) {
      setUpdatedUserData(currentUser);
      dispatch(setUser(currentUser));
    }
  }, [currentUser, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (['country', 'city', 'address'].includes(name)) {
      setUpdatedUserData(prev => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setUpdatedUserData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setUpdatedUserData(prev => ({ ...prev, address: { ...prev.address, country: value }}));
  };

  const handlePhoneChange = (
    value: string,
    country: any,
    e: React.ChangeEvent,
    formattedPhone: string,
  ) => {
    setUpdatedUserData(prev => ({...prev, phoneNumber: formattedPhone}));
  };

  const handleUpdateUser = async () => {
    await updateCurrentUser(updatedUserData);
    dispatch(updateUser(updatedUserData));
  };

  if (loading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  return (
    <main>
      <h2>My Profile</h2>

      <div className={styles.profileDetails}>
        <div className={styles.field}>
          <h3 className={styles.headingSecondary}>Account Information</h3>

          <Input
            className={styles.input}
            type={InputTypes.EMAIL}
            value={updatedUserData.email}
            placeholder='Enter your email'
            onChange={handleInputChange}
            name='email'
          />

          <div className={styles.change}>
            <Link href='/reset-password'>Reset password</Link>
          </div>
        </div>

        <div className={styles.field}>
          <h3 className={styles.headingSecondary}>Personal data:</h3>

          <div className={styles.inputs}>
            <Input
              className={styles.input}
              type={InputTypes.TEXT}
              value={updatedUserData.name}
              placeholder='Enter your first name'
              name='name'
              onChange={handleInputChange}
              required
            />

            <Input
              className={styles.input}
              type={InputTypes.TEXT}
              value={updatedUserData.lastName}
              placeholder='Enter your last name'
              onChange={handleInputChange}
              name='lastName'
            />
          </div>

          <div className={styles.input}>
            <PhoneInput
              country={'us'}
              value={updatedUserData.phoneNumber}
              onChange={handlePhoneChange}
              placeholder='Enter your phone number'
              preserveOrder={['+', '(', ')', '-', ' ']}
              inputProps={{
                name: 'phoneNumber',
                required: true,
              }}
            />
          </div>
        </div>

        <div className={styles.field}>
          <h3 className={styles.headingSecondary}>Delivery address:</h3>

          <Select
            options={countries}
            value={updatedUserData.address.country}
            onChange={handleSelectChange}
            placeholder='Choose your country'
          />

          <Input
            className={styles.input}
            type={InputTypes.TEXT}
            placeholder='Choose your city'
            name='city'
            value={updatedUserData.address.city}
            onChange={handleInputChange}
          />

          <Input
            className={styles.input}
            type={InputTypes.TEXT}
            placeholder='Enter your address'
            name='address'
            onChange={handleInputChange}
            value={updatedUserData.address.address}
          />
        </div>

        <Button onClick={handleUpdateUser}>Save</Button>
      </div>
    </main>
  );
};

export default Profile;
