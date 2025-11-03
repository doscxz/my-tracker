import React from 'react';
import NavigationBar from '@/component/NavigationBar/NavigationBar';
import './global.css';
import { Mulish } from 'next/font/google';
import Providers from '@/component/Providers/Providers';
import { makeStore } from '@/store/store';
import { tasksApi } from '@/store/api/tasksApi';

const roboto = Mulish({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = makeStore();
  store.dispatch(tasksApi.endpoints.getTasks.initiate());
  await Promise.all(store.dispatch(tasksApi.util.getRunningQueriesThunk()));

  const preloadedState = store.getState();
  return (
    <html lang="ru">
      <body className={(roboto.className, 'bg-stone-700')}>
        <Providers preloadedState={preloadedState}>
          <div className="flex">
            <NavigationBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
