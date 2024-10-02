'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

import styles from './page.module.scss';

import { Input, Button } from '@/components';

import { resetPassword } from '@/services/users/userService';

import { ApiError, ButtonTypes, InputTypes, ResetPasswordI } from '@/types';

import { TOAST_MESSAGES } from '@/app/constants';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordI>();

  const handleChangePassword = async (data: ResetPasswordI) => {
    const { currentPassword, newPassword, confirmedPassword } = data;

    if (newPassword !== confirmedPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      setLoading(true);

      await resetPassword(currentPassword, newPassword);

      toast.success(TOAST_MESSAGES.CHANGE_PASSWORD_SUCCESS);
    } catch (error) {
      const apiError = error as ApiError;

      toast.error(`Error changing password: ${apiError.response?.data?.message || 'Unknown error'}`);
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
            {...register('confirmedPassword', { required: 'Please confirm your new password' })}
          />

          {errors.confirmedPassword && <p className={styles.error}>{errors.confirmedPassword.message}</p>}
        </div>

        <div>
          <Button type={ButtonTypes._SUBMIT} disabled={loading}>{loading ? 'Changing...' : 'Change password'}</Button>
        </div>
      </form>
    </main>
  );
};

export default ResetPassword;
