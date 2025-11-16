'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { initializeStore, RootStore } from './store';

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = ({ children, store }: { children: ReactNode; store: RootStore }) => {
  const initStore = initializeStore(store);
  return <StoreContext.Provider value={initStore}>{children}</StoreContext.Provider>;
};

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return store;
};
