import React from 'react';
import SideBar from '@/component/SideBar/SideBar';
import './globals.css';
import { Mulish } from 'next/font/google';

const roboto = Mulish({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(roboto.className, 'bg-stone-700')}>
        <div className={'flex'}>
          <SideBar />
          {children}
        </div>
      </body>
    </html>
  );
}
