'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import { toast } from 'react-toastify';

import 'react-phone-input-2/lib/style.css';
import styles from './page.module.scss';

import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import { Input, Button, Select, Loader } from '@/components';

import { getNames } from 'country-list';

import { updateUser } from '@/features/user/userSlice';

import { TOAST_MESSAGES } from '@/app/constants';

import { ButtonTypes, InputTypes, UpdatedUserDataI } from '@/types';
import { AppDispatch, RootState } from '@/app/store';

const Profile: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const countries = getNames();

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({ defaultValues: { name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: {
      country: '',
      city: '',
      address: '',
    },
  } });

  useEffect(() => {
    if (user) {
      reset({ name: user?.name || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        address: {
          country: user?.address?.country || '',
          city: user?.address?.city || '',
          address: user?.address?.address || '',
        },
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UpdatedUserDataI) => {
    try {
      const response = await dispatch(updateUser(data)).unwrap();

      reset({ name: response.name || '',
        lastName: response.lastName || '',
        email: response.email || '',
        phoneNumber: response.phoneNumber || '',
        address: {
          country: response.address?.country || '',
          city: response.address?.city || '',
          address: response.address?.address || '',
        },
      });

      toast.success(TOAST_MESSAGES.UPDATE_USER_SUCCESS);
    } catch (error) {
      toast.error(`${error}`);
      console.error(`Could not update user: ${error}`);
    }
  };

  if (loading) {
    return (
      <main className={styles.containerEmpty}>
        <Loader />
      </main>
    );
  }

  return (
    <main>
      <h2>My Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.profileDetails}>
        <div className={styles.field}>
          <h3 className={styles.headingSecondary}>Account Information</h3>

          <div className={styles.inputContainer}>
            <Input
              className={styles.input}
              type={InputTypes._EMAIL}
              placeholder='Enter your email'
              {...register('email', { required: 'Email is required' })}
            />

            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.change}>
            <Link href='/reset-password'>Reset password</Link>
          </div>
        </div>

        <div className={styles.field}>
          <h3 className={styles.headingSecondary}>Personal data:</h3>

          <div className={styles.inputs}>
            <div className={styles.inputContainer}>
              <Input
                className={styles.input}
                type={InputTypes._TEXT}
                placeholder='Enter your first name'
                {...register('name', { required: 'First name is required' })}
              />

              {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            </div>

            <div className={styles.inputContainer}>
              <Input
                className={styles.input}
                type={InputTypes._TEXT}
                placeholder='Enter your last name'
                {...register('lastName', { required: 'Last name is required' })}
              />

              {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
            </div>
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <Controller
                control={control}
                name='phoneNumber'
                render={({ field }) => (
                  <PhoneInput
                    country={'us'}
                    value={field.value}
                    onChange={(value, country, e, formattedValue) => {
                      field.onChange(formattedValue);
                    }}
                    placeholder='Enter your phone number'
                    preserveOrder={['+', '(', ')', '-', ' ']}
                    enableAreaCodes
                    inputProps={{ name: 'phoneNumber' }}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className={styles.field}>
          <h3 className={styles.headingSecondary}>Delivery address:</h3>

          <div className={styles.inputContainer}>
            <Controller
              control={control}
              name='address.country'
              render={({ field }) => (
                <Select
                  options={countries}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Choose your country'
                />
              )}
            />

            {errors.address?.country && <p className={styles.error}>{errors.address.country.message}</p>}
          </div>

          <div className={styles.inputContainer}>
            <Input
              className={styles.input}
              type={InputTypes._TEXT}
              placeholder='Enter your city'
              {...register('address.city')}
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              className={styles.input}
              type={InputTypes._TEXT}
              placeholder='Enter your address'
              {...register('address.address')}
            />
          </div>
        </div>

        <Button type={ButtonTypes._SUBMIT}>Save</Button>
      </form>
    </main>
  );
};

export default Profile;
