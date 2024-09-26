'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import styles from './page.module.scss';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { Button, Input } from '@/components';

import { FiEye, FiEyeOff } from 'react-icons/fi';

import { signIn } from '@/features/user/userSlice';

import { TOAST_MESSAGES } from '@/app/constants';

import { InputTypes, SignInDataI, ButtonOptions } from '@/types';
import { AppDispatch } from '@/app/store';

const SignIn: React.FC = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignInDataI>();

  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<SignInDataI> = async data => {
    try {
      await dispatch(signIn(data)).unwrap();

      toast.success(TOAST_MESSAGES.SIGN_IN_SUCCESS);
      push('/');
    } catch (error: any) {
      console.error(`Could not sign in: ${error}`);
      toast.error(error);
    }
  };

  const handlePasswordShown = () => {
    setIsPasswordShown(prev => !prev);
  };

  const handleGoogleSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    console.log('Google sign in logic here');
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
            type={isPasswordShown ? InputTypes._PASSWORD : InputTypes._TEXT}
            placeholder='Enter your password'
            title='Password must have at least 8 characters'
            icon={isPasswordShown ?
              <FiEye size={24} onClick={handlePasswordShown} /> : <FiEyeOff size={24} onClick={handlePasswordShown}/>}
            {...register('password', { required: 'Password is required' })}
          />

          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <div className={styles.formInfo}>
          <div className={styles.buttons}>
            <Button>Sign in</Button>
            <Button option={ButtonOptions._GOOGLE} onClick={handleGoogleSignIn}>Sign up with Google</Button>
          </div>

          <span>
            Don&apos;t have an account?
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
