import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TypeInitialState } from '../slices/tasksByStatusSlice';
import { typedEntries } from '@/helper/typesObjectFunction';
import { Task } from '@/constant/@type';

export const TasksByStatus = (state: RootState) => state.tasksByStatus;

export const TasksWithoutStatuses = createSelector(
  TasksByStatus,
  (statusOnTask: TypeInitialState): Task[] | null => {
    const tasks = typedEntries(statusOnTask).flatMap(([key, value]) => [...value]);
    return tasks.length > 0 ? tasks : null;
  }
);
