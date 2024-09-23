'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'react-phone-input-2/lib/style.css';
import styles from './page.module.scss';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { Input, Button, Select, Loader } from '@/components';
import PhoneInput from 'react-phone-input-2';

import { getNames } from 'country-list';

import { updateUser } from '@/features/user/userSlice';

import { InputTypes } from '@/types';
import { AppDispatch, RootState } from '@/app/store';

const Profile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.user);

  const [updatedUserData, setUpdatedUserData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: {
      country: '',
      city: '',
      address: '',
    },
  });

  const countries = getNames();

  useEffect(() => {
    if (user) {
      setUpdatedUserData({
        name: user?.user?.name || '',
        lastName: user?.user?.lastName || '',
        email: user?.user?.email || '',
        phoneNumber: user?.user?.phoneNumber || '',
        address: {
          country: user?.user?.address?.country || '',
          city: user?.user?.address?.city || '',
          address: user?.user?.address?.address || '',
        },
      });
    }
  }, [user]);

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
    setUpdatedUserData(prev => ({ ...prev, address: { ...prev.address, country: value } }));
  };

  const handlePhoneChange = (value: string, country: string, e: React.ChangeEvent, formattedPhone: string) => {
    setUpdatedUserData(prev => ({ ...prev, phoneNumber: formattedPhone }));
  };
  const handleUpdateUser = async () => {
    try {
      const response = await dispatch(updateUser(updatedUserData)).unwrap();

      setUpdatedUserData({
        name: response.name || '',
        lastName: response.lastName || '',
        email: response.email || '',
        phoneNumber: response.phoneNumber || '',
        address: {
          country: response.address?.country || '',
          city: response.address?.city || '',
          address: response.address?.address || '',
        },
      });

      toast.success('User has been updated');
    } catch (error) {
      toast.error(`${error}`);
      console.error(`Could not update user: ${error}`);
    }
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
            type={InputTypes._EMAIL}
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
              type={InputTypes._TEXT}
              value={updatedUserData.name}
              placeholder='Enter your first name'
              name='name'
              onChange={handleInputChange}
              required
            />

            <Input
              className={styles.input}
              type={InputTypes._TEXT}
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
            type={InputTypes._TEXT}
            placeholder='Choose your city'
            name='city'
            value={updatedUserData.address.city}
            onChange={handleInputChange}
          />

          <Input
            className={styles.input}
            type={InputTypes._TEXT}
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
