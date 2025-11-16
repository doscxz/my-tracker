import React from 'react';
import NavigationBar from '@/component/NavigationBar/NavigationBar';
import './global.css';
import { Mulish } from 'next/font/google';
import Providers from '@/component/Providers/Providers';
import { initializeStore, InitialData } from '@/storeMobX/store';

const roboto = Mulish({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = initializeStore();

  await store.tasksApi.getTasks();

  // Serialize store data to plain object (like preloadedState in Redux)
  const initialData: InitialData = {
    tasksByStatus: {
      initialState: JSON.parse(JSON.stringify(store.tasksByStatus.initialState)),
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
