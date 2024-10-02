import React from 'react';

import type { Metadata } from 'next';
import { Open_Sans, Montserrat } from 'next/font/google';

import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import ReduxProvider from '@/app/provider';

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
      <body
        className={`${montserrat.className} ${openSans.className}`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <Header />
          {children}
          <Footer />

          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
