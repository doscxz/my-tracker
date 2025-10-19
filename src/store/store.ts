import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers';
import { tasksApi } from './api/tasksApi';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// HOOK'S
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
