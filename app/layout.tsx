import React from 'react';

import type { Metadata } from 'next';
import { Open_Sans, Montserrat } from 'next/font/google';

import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import ReduxProvider from '@/app/provider';

import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import { Footer, Header } from '@/components';

const montserrat = Montserrat({ subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Diploma Project',
  description:
    'Music instrument website implemented by Matsvei Balakhonau 58216 as a Diploma Project for Vistula University',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <meta name='google-signin-client_id' content={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} />
      </Head>
      <body
        className={`${montserrat.className} ${openSans.className}`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <Header />
          {children}
          <Footer />

          <ToastContainer />
          <Script src='https://accounts.google.com/gsi/client' strategy='afterInteractive' async defer />
        </ReduxProvider>
      </body>
    </html>
  );
}
