import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const id = new Date().toLocaleDateString();
export type TypeTask = {
  id: string;
  title: string;
  description: string;
};
type TypeInitialState = Record<string, Partial<TypeTask[]>>; // TODO: вместо string - подвязка по статусу колонки kanbanboard

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
    createTask: (
      state,
      {
        payload: { description, status, title },
      }: PayloadAction<Omit<TypeTask, 'id'> & { status: string }>
    ) => {
      state[status].push({ id, title, description });
    },
    removeTask: (
      state,
      { payload: { taskId, status } }: PayloadAction<{ taskId: TypeTask['id']; status: string }>
    ) => {
      const index = state[status].findIndex((task) => task?.id === taskId);
      delete state[status][index];
    },
    moveTask: (
      state,
      {
        payload: { taskId, fromStatus, toStatus },
      }: PayloadAction<{
        taskId: TypeTask['id'];
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
  },
});

export const { addStatus, removeStatus, createTask, removeTask, moveTask } =
  tasksByStatusSlice.actions;

export default tasksByStatusSlice.reducer;
