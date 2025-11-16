'use client';
import { enableStaticRendering } from 'mobx-react-lite';
import { initializeStore, InitialData } from '@/storeMobX/store';
import { StoreProvider } from '@/storeMobX/StoreContext';

enableStaticRendering(false);

interface Props {
  children: React.ReactNode;
  initialData?: InitialData | null;
}
const Providers = ({ children, initialData }: Props) => {
  const initializedStore = initializeStore(initialData || null);

  return <StoreProvider store={initializedStore}>{children}</StoreProvider>;
};

export default Providers;
