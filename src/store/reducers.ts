import { combineReducers } from '@reduxjs/toolkit';
import { tasksApi } from './api/tasksApi';
import tasksByStatusReducer from './slices/tasksByStatusSlice';

export const reducer = combineReducers({
  tasksByStatus: tasksByStatusReducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
});
