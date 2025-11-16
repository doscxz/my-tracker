import { makeAutoObservable, runInAction } from 'mobx';
import { Details, Priority, Task } from '@/constant/@type';
import { TaskFormData } from '@/shared/Modal/TaskModal';
import { typedEntries } from '@/helper/typesObjectFunction';

export type TypeInitialState = Record<string, Task[]>;

class TasksByStatusStore {
  initialState: TypeInitialState = {
    backlog: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Computed геттер для получения всех задач без статусов
  get tasksWithoutStatuses(): Task[] | null {
    const tasks = typedEntries(this.initialState).flatMap(([key, value]) => [...value]);
    return tasks.length > 0 ? tasks : null;
  }

  // Actions
  addStatus(status: string) {
    this.initialState[status] = [];
  }

  removeStatus(status: string) {
    delete this.initialState[status];
  }

  editedFiled(payload: {
    id: number;
    statusTask: string;
    keyField: keyof Task | keyof Details;
    value: string | Priority;
  }) {
    const task = this.initialState[payload.statusTask].find((task) => task.id === payload.id);
    if (task) {
      if (payload.keyField in task && payload.keyField !== 'details') {
        (task[payload.keyField as keyof Task] as any) = payload.value;
      } else {
        (task.details[payload.keyField as keyof Details] as any) = payload.value;
      }
    }
  }

  createTask(payload: TaskFormData) {
    const id = Number(new Date().getTime());
    const { description, status, title, details } = payload;

    if (!this.initialState[status]) {
      this.initialState[status] = [];
    }

    this.initialState[status].push({
      id: id,
      title,
      status,
      description,
      details: {
        type: details.type,
        priority: details.priority,
        tags: details.tags,
      },
      comments: [],
    });
  }

  removeTask(payload: { taskId: Task['id']; status: string }) {
    const { taskId, status } = payload;
    const index = this.initialState[status]?.findIndex((task) => task?.id === taskId);
    if (index !== -1) {
      this.initialState[status].splice(index, 1);
    }
  }

  moveTask(payload: { taskId: Task['id']; fromStatus: string; toStatus: string }) {
    const { taskId, fromStatus, toStatus } = payload;

    // Найти задачу в исходной колонке
    const taskIndex = this.initialState[fromStatus]?.findIndex((task) => task?.id === taskId);
    if (taskIndex === -1) return;

    const task = this.initialState[fromStatus][taskIndex];
    if (!task) return;

    // Удалить задачу из исходной колонки
    this.initialState[fromStatus].splice(taskIndex, 1);

    this.initialState[toStatus].push(task);
  }

  distributeTasksByStatus(payload: { tasks?: Task[] }) {
    const { tasks } = payload;
    if (!tasks) return;

    runInAction(() => {
      // Очистить все текущие статусы (колонки)
      Object.keys(this.initialState).forEach((status) => {
        this.initialState[status] = [];
      });

      // Разложить задачи по статусам
      tasks.forEach((task) => {
        const status = task.status || 'backlog';
        if (!this.initialState[status]) {
          this.initialState[status] = [];
        }
        this.initialState[status].push(task);
      });
    });
  }
}

export default TasksByStatusStore;
