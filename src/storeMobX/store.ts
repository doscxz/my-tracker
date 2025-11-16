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

let clientSideStore: RootStore | undefined;

// Type for serialized initial data (plain object)
export type InitialData = {
  tasksByStatus?: {
    initialState: Record<string, Task[]>;
  };
};

export function initializeStore(initialData: InitialData | null = null): RootStore {
  if (isServer) {
    return createStore();
  }

  if (!clientSideStore) {
    clientSideStore = createStore();
  }

  // Hydrate store with serialized initial data
  if (initialData?.tasksByStatus?.initialState) {
    clientSideStore.tasksByStatus.initialState = initialData.tasksByStatus.initialState;
  }

  return clientSideStore;
}

export type { RootStore };
