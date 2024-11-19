'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { toast } from 'react-toastify';

import styles from './page.module.scss';

import dynamic from 'next/dynamic';

import Link from 'next/link';
import { Button, Input } from '@/components';

const GoogleSignInButton = dynamic(() => import('../../components/google-button/index'), { ssr: false });

import { FiEye, FiEyeOff } from 'react-icons/fi';

import { signIn } from '@/features/user/userSlice';

import { InputTypes, SignInDataI, ButtonTypes, ApiError } from '@/types';
import { AppDispatch } from '@/app/store';

import { TOAST_MESSAGES } from '@/app/constants';

const SignIn: React.FC = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignInDataI>();

  const { push } = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<SignInDataI> = async data => {
    try {
      await dispatch(signIn(data)).unwrap();

      toast.success(TOAST_MESSAGES.SIGN_IN_SUCCESS);
      sessionStorage.removeItem('cartItems');
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
      <h2>Sign in</h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={InputTypes._EMAIL}
            placeholder='Enter your email'
            {...register('email', { required: 'Email is required' })}
          />

          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={isPasswordShown ? InputTypes._TEXT : InputTypes._PASSWORD}
            placeholder='Enter your password'
            title='Password must have at least 8 characters'
            icon={isPasswordShown ?
              <FiEyeOff size={24} onClick={handlePasswordShown} /> : <FiEye size={24} onClick={handlePasswordShown}/>}
            {...register('password', { required: 'Password is required' })}
          />

          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <div className={styles.formInfo}>
          <div className={styles.buttons}>
            <Button type={ButtonTypes._SUBMIT}>Sign in</Button>
            <GoogleSignInButton />
          </div>

          <span>
            <Link className={styles.signUpLink} href='/sign-up'>
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
