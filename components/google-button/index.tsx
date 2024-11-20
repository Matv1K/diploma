'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

import { googleSignIn } from '@/features/user/userSlice';

import { AppDispatch } from '@/app/store';
import { TOAST_MESSAGES } from '@/app/constants';

interface GoogleSignInResponse {
  credential: string;
}

const GoogleSignInButton: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();

  const handleCallbackResponse = async (response: GoogleSignInResponse) => {
    try {
      const googleToken = response.credential;

      await dispatch(googleSignIn(googleToken)).unwrap();

      toast.success(TOAST_MESSAGES.SIGN_IN_SUCCESS);

      sessionStorage.removeItem('cartItems');

      push('/');
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      toast.error('Google Sign-In failed');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const google = window.google.accounts.id;

      console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

      google.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });

      google.renderButton(document.getElementById('googleSignInButton'), {
        size: 'large',
        text: 'signin_with',
      });

      return () => {
        if (google) {
          google.disableAutoSelect();
        }
      };
    }
  }, []);

  return <div id='googleSignInButton' />;
};

export default GoogleSignInButton;
