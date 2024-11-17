'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { toast } from 'react-toastify';

import { Input, Button } from '@/components';

import { FiEyeOff, FiEye } from 'react-icons/fi';

import { resetPassword } from '@/api/users/userService';

import { ApiError, ButtonTypes, InputTypes, ResetPasswordI } from '@/types';

import { TOAST_MESSAGES } from '@/app/constants';

const ResetPassword = () => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordI>();

  const handlePasswordShown = () => {
    setIsPasswordShown(prev => !prev);
  };

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

      if (apiError.response?.status === 400) {
        toast.error(apiError.response?.data?.message || 'Current password is incorrect');
      } else {
        toast.error(`Error changing password: ${apiError.response?.data?.message || 'Unknown error'}`);
      }
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
            type={!isPasswordShown ? InputTypes._PASSWORD : InputTypes._TEXT}
            placeholder='Enter your current password'
            icon={isPasswordShown ?
              <FiEyeOff size={24} onClick={handlePasswordShown} /> : <FiEye size={24} onClick={handlePasswordShown}/>}
            {...register('currentPassword', { required: 'Current password is required' })}
          />

          {errors.currentPassword && <p className={styles.error}>{errors.currentPassword.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={!isPasswordShown ? InputTypes._PASSWORD : InputTypes._TEXT}
            placeholder='Enter new password'
            icon={isPasswordShown ?
              <FiEyeOff size={24} onClick={handlePasswordShown} /> : <FiEye size={24} onClick={handlePasswordShown}/>}
            {...register('newPassword', { required: 'New password is required' })}
          />

          {errors.newPassword && <p className={styles.error}>{errors.newPassword.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={!isPasswordShown ? InputTypes._PASSWORD : InputTypes._TEXT}
            placeholder='Confirm new password'
            icon={isPasswordShown ?
              <FiEyeOff size={24} onClick={handlePasswordShown} /> : <FiEye size={24} onClick={handlePasswordShown}/>}
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
