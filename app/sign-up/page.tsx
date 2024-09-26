'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import 'react-toastify/dist/ReactToastify.css';
import styles from './page.module.scss';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { Input, Button } from '@/components';

import { signUp } from '@/features/user/userSlice';

import { TOAST_MESSAGES } from '@/app/constants';
import { ButtonOptions, InputTypes, SignUpDataI } from '@/types';
import { AppDispatch } from '@/app/store';

const SignUp: React.FC = () => {
  const [inputData, setInputData] = useState<SignUpDataI>({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      await dispatch(signUp(inputData)).unwrap();

      toast.success(TOAST_MESSAGES.SIGN_UP_SUCCESS);
      push('/');
    } catch (error: any) {
      console.error(`Could not sign up: ${error}`);
      toast.error(error || 'Failed to sign up. Please try again.');
    }
  };

  const handleGoogleSignUp = () => {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputData((prev: SignUpDataI) => ({ ...prev, [name]: value }));
  };

  return (
    <main>
      <h2>Sign up</h2>

      <form className={styles.form}>
        <Input
          className={styles.input}
          type={InputTypes._TEXT}
          placeholder='Enter your name'
          onChange={handleInputChange}
          name='name'
          required
        />

        <Input
          className={styles.input}
          type={InputTypes._TEXT}
          placeholder='Enter your last name'
          onChange={handleInputChange}
          name='lastName'
          required
        />

        <Input
          className={styles.input}
          type={InputTypes._EMAIL}
          placeholder='Enter your email'
          onChange={handleInputChange}
          name='email'
          required
          autoComplete='off'
        />

        <Input
          className={styles.input}
          type={InputTypes._PASSWORD}
          placeholder='Enter your password'
          title='Password must have at least 8 characters'
          onChange={handleInputChange}
          name='password'
          required
          autoComplete='off'
        />

        <div className={styles.formInfo}>
          <div className={styles.buttons}>
            <Button onClick={handleSignUp}>Sign up</Button>
            <Button option={ButtonOptions._GOOGLE} onClick={handleGoogleSignUp}>Sign up with Google</Button>
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
