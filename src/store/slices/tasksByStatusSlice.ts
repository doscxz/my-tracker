import { Details, Priority, Task } from '../../constant/@type';
import { TaskFormData } from '../../shared/Modal/TaskModal';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const id = Number(new Date().getTime());

export type TypeInitialState = Record<string, Task[]>; // TODO: вместо string - подвязка по статусу колонки kanbanboard

const initialState: TypeInitialState = {
  backlog: [],
};

const tasksByStatusSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    addStatus: (state, action: PayloadAction<string>) => {
      state[action.payload] = [];
    },
    removeStatus: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    editedFiled: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: number;
        statusTask: string;
        keyField: keyof Task | keyof Details;
        value: string | Priority;
      }>
    ) => {
      const task = state[payload.statusTask].find((task) => task.id === payload.id);
      if (task) {
        if (payload.keyField in task && payload.keyField !== 'details') {
          (task[payload.keyField as keyof Task] as any) = payload.value;
        } else {
          (task.details[payload.keyField as keyof Details] as any) = payload.value;
        }
      }
    },
    createTask: (
      state,
      { payload: { description, priority, status, tag, title, type } }: PayloadAction<TaskFormData>
    ) => {
      state[status].push({
        id: id,
        title,
        status,
        description,
        details: {
          type,
          priority,
          tags: tag,
        },
        comments: [],
      });
    },
    removeTask: (
      state,
      { payload: { taskId, status } }: PayloadAction<{ taskId: Task['id']; status: string }>
    ) => {
      const index = state[status].findIndex((task) => task?.id === taskId);
      if (index !== -1) {
        state[status].splice(index, 1);
      }
    },
    moveTask: (
      state,
      {
        payload: { taskId, fromStatus, toStatus },
      }: PayloadAction<{
        taskId: Task['id'];
        fromStatus: string;
        toStatus: string;
      }>
    ) => {
      // Найти задачу в исходной колонке
      const taskIndex = state[fromStatus].findIndex((task) => task?.id === taskId);
      if (taskIndex === -1) return;

      const task = state[fromStatus][taskIndex];
      if (!task) return;

      // Удалить задачу из исходной колонки
      state[fromStatus].splice(taskIndex, 1);

      // Добавить задачу в целевую колонку
      state[toStatus].push(task);
    },
    distributeTasksByStatus: (state, action: PayloadAction<{ tasks?: Task[] }>) => {
      const { tasks } = action.payload;
      if (!tasks) return;
      // Очистить все текущие статусы (колонки)
      Object.keys(state).forEach((status) => {
        state[status] = [];
      });
      // Разложить задачи по статусам
      tasks.forEach((task) => {
        const status = task.status || 'backlog';
        if (!state[status]) {
          state[status] = [];
        }
        state[status].push(task);
      });
    },
  },
});

export const {
  addStatus,
  removeStatus,
  createTask,
  removeTask,
  moveTask,
  distributeTasksByStatus,
  editedFiled,
} = tasksByStatusSlice.actions;

export default tasksByStatusSlice.reducer;
