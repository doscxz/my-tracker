import { combineReducers } from '@reduxjs/toolkit';
import reducers from './slices/index';
import { enableMapSet } from 'immer';

const { tasksByStatusReducer } = reducers;

enableMapSet(); // COMMENT по умолчанию redux не умеет работать с Map and Set - включаем что бы умел

export const reducer = combineReducers({
  tasksByStatus: tasksByStatusReducer,
});
