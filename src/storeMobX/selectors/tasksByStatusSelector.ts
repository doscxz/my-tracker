import { computed, makeAutoObservable } from 'mobx';
import { TypeInitialState } from '../stores/tasksByStatusStore';
import { typedEntries } from '@/helper/typesObjectFunction';
import { Task } from '@/constant/@type';
import { RootStore } from '../store';

// Селекторы как computed свойства
export class TasksByStatusSelectors {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  // Базовый селектор - возвращает все задачи по статусам
  @computed
  get TasksByStatus(): TypeInitialState {
    return this.rootStore.tasksByStatus.initialState;
  }

  // Селектор, который возвращает все задачи без статусов
  @computed
  get TasksWithoutStatuses(): Task[] | null {
    const tasks = typedEntries(this.rootStore.tasksByStatus.initialState).flatMap(
      ([key, value]) => [...value]
    );
    return tasks.length > 0 ? tasks : null;
  }
}

// Функции-селекторы для совместимости с Redux подходом
export const createTasksByStatusSelectors = (rootStore: RootStore) => {
  return {
    TasksByStatus: () => rootStore.tasksByStatus.initialState,
    TasksWithoutStatuses: (): Task[] | null => {
      const tasks = typedEntries(rootStore.tasksByStatus.initialState).flatMap(([key, value]) => [
        ...value,
      ]);
      return tasks.length > 0 ? tasks : null;
    },
  };
};
