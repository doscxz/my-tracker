import React from 'react';
import NavigationBar from '@/component/NavigationBar/NavigationBar';
import './global.css';
import { Mulish } from 'next/font/google';
import Providers from '@/component/Providers/Providers';
import { initializeStore, InitialData } from '@/storeMobX/store';
import { toJS } from 'mobx';

const roboto = Mulish({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = initializeStore();

  await store.tasksApi.getTasks();
  const initialData: InitialData = {
    tasksByStatus: {
      initialState: toJS(store.tasksByStatus.initialState),
    },
  };

  return (
    <html lang="ru">
      <body className={`${roboto.className} bg-stone-700`}>
        <Providers initialData={initialData}>
          <div className="flex min-h-screen">
            <NavigationBar />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
