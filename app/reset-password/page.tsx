'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { toast } from 'react-toastify';

import { Input, Button } from '@/components';

import { resetPassword } from '@/services/users/userService';

import { ButtonTypes, InputTypes } from '@/types';
import { TOAST_MESSAGES } from '../constants';

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (data: any) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(currentPassword, newPassword);
      toast.success(TOAST_MESSAGES.CHANGE_PASSWORD_SUCCESS);
    } catch (error) {
      toast.error(`Error changing password: ${error.response?.data?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h2>Reset Password</h2>
      <form className={styles.form} onSubmit={handleSubmit(handleChangePassword)}>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={InputTypes._PASSWORD}
            placeholder='Enter your current password'
            {...register('currentPassword', { required: 'Current password is required' })}
          />

          {errors.currentPassword && <p className={styles.error}>{errors.currentPassword.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={InputTypes._PASSWORD}
            placeholder='Enter new password'
            {...register('newPassword', { required: 'New password is required' })}
          />

          {errors.newPassword && <p className={styles.error}>{errors.newPassword.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={InputTypes._PASSWORD}
            placeholder='Confirm new password'
            {...register('confirmPassword', { required: 'Please confirm your new password' })}
          />

          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
        </div>

        <div>
          <Button type={ButtonTypes._SUBMIT} disabled={loading}>{loading ? 'Changing...' : 'Change password'}</Button>
        </div>
      </form>
    </main>
  );
};

export default ResetPassword;
