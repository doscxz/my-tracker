import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers';
import { tasksApi } from './api/tasksApi';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

export type RootState = ReturnType<typeof reducer>;

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

// HOOK'S
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
