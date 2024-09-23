'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import styles from './page.module.scss';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { Button, Input } from '@/components';

import { signIn } from '@/features/user/userSlice';

import { TOAST_MESSAGES } from '@/app/constants';

import { InputTypes, SignInDataI } from '@/types';
import { AppDispatch } from '@/app/store';

const SignIn: React.FC = () => {
  const [inputData, setInputData] = useState<SignInDataI>({ email: '', password: '' });

  const { push } = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputData((prev: SignInDataI) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(signIn(inputData)).unwrap();

      toast.success(TOAST_MESSAGES.SIGN_IN_SUCCESS);
      push('/');
    } catch (error) {
      console.error(`Could not sign in: ${error}`);
      toast.error(TOAST_MESSAGES.SIGN_IN_ERROR);
    }
  };

  return (
    <main>
      <h2>Sign in</h2>

      <form className={styles.form} onSubmit={handleSignIn}>
        <Input
          className={styles.input}
          type={InputTypes._EMAIL}
          placeholder='Enter your email'
          onChange={handleInputChange}
          name='email'
        />

        <Input
          className={styles.input}
          type={InputTypes._PASSWORD}
          placeholder='Enter your password'
          title='Password must have at least 8 characters'
          onChange={handleInputChange}
          name='password'
        />

        <div className={styles.formInfo}>
          <Button>Sign in</Button>

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
