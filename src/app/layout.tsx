import React from 'react';
import NavigationBar from '@/component/NavigationBar/NavigationBar';
import './globals.css';
import { Mulish } from 'next/font/google';
import Providers from '@/component/Providers/Providers';

const roboto = Mulish({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(roboto.className, 'bg-stone-700')}>
        <Providers>
          <div className={'flex'}>
            <NavigationBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
