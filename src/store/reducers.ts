import { combineReducers } from '@reduxjs/toolkit';
import { tasksApi } from './api/tasksApi';
import { enableMapSet } from 'immer';
import tasksByStatusReducer from './slices/tasksByStatusSlice';

enableMapSet(); // COMMENT по умолчанию redux не умеет работать с Map and Set - включаем что бы умел

export const reducer = combineReducers({
  tasksByStatus: tasksByStatusReducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
});
