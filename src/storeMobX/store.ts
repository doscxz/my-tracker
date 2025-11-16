import TasksApiStore from './api/tasksApiStore';
import TasksByStatusStore from './stores/tasksByStatusStore';
import { Task } from '@/constant/@type';

const isServer = typeof window === 'undefined';

type RootStore = {
  tasksByStatus: TasksByStatusStore;
  tasksApi: TasksApiStore;
};

function createStore(): RootStore {
  const store = {
    tasksByStatus: new TasksByStatusStore(),
  } as RootStore;

  store.tasksApi = new TasksApiStore(store);

  return store;
}

let store: RootStore = createStore();

// Type for serialized initial data (plain object)
export type InitialData = {
  tasksByStatus: {
    initialState: Record<string, Task[]>;
  };
};

export function initializeStore(initialData: InitialData | null = null): RootStore {
  if (initialData?.tasksByStatus?.initialState) {
    store.tasksByStatus.setInitialState(initialData.tasksByStatus.initialState);
  }

  return store;
}

export type { RootStore };
