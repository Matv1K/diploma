'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './page.module.scss';

import Link from 'next/link';
import { Input, Button } from '@/components';

import { FiEye, FiEyeOff } from 'react-icons/fi';

import { signUp } from '@/features/user/userSlice';

import { TOAST_MESSAGES } from '@/app/constants';

import { ButtonTypes, InputTypes, SignUpDataI, ApiError } from '@/types';
import { AppDispatch } from '@/app/store';

const SignUp: React.FC = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpDataI>();

  const { push } = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async (data: SignUpDataI) => {
    try {
      await dispatch(signUp(data)).unwrap();

      toast.success(TOAST_MESSAGES.SIGN_UP_SUCCESS);
      push('/');
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message);
    }
  };

  const handlePasswordShown = () => {
    setIsPasswordShown(prev => !prev);
  };

  return (
    <main>
      <h2>Sign up</h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={InputTypes._TEXT}
            placeholder='Enter your name'
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters long' },
            })}
          />

          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={InputTypes._TEXT}
            placeholder='Enter your last name'
            {...register('lastName', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Last name must be at least 2 characters long' },
            })}
          />

          {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={InputTypes._EMAIL}
            placeholder='Enter your email'
            autoComplete='off'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email',
              },
            })}
          />

          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={isPasswordShown ? InputTypes._PASSWORD : InputTypes._TEXT}
            placeholder='Enter your password'
            autoComplete='off'
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters long' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, and 8 characters',
              },
            })}
            icon={isPasswordShown ?
              <FiEye size={24} onClick={handlePasswordShown}/> : <FiEyeOff size={24} onClick={handlePasswordShown} />}
          />

          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        <div className={styles.formInfo}>
          <div className={styles.buttons}>
            <Button type={ButtonTypes._SUBMIT}>Sign up</Button>
          </div>

          <span>
            Already have an account?{' '}
            <Link className={styles.signInLink} href='/sign-in'>
              Sign in
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
