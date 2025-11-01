'use client';
import { makeStore, RootState } from '@/store/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

interface Props {
  children: React.ReactNode;
  preloadedState?: Partial<RootState>;
}
const Providers = ({ children, preloadedState }: Props) => {
  const storeRef = useRef<ReturnType<typeof makeStore>>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState);
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default Providers;
