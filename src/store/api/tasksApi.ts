import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '@/constant/@type';
import { API_BASE_URL } from '@/constant/common';
import { ENDPOINTS } from '@/constant/endpoints';
import { Response } from '@/api/@type/response';
import { distributeTasksByStatus } from '../slices/tasksByStatusSlice';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => ENDPOINTS.tasks,
      transformResponse: (response: Response<Task[]>) => response.data,
      providesTags: ['Task'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(distributeTasksByStatus({ tasks: data }));
        } catch (error) {
          console.error('Ошибка при получении задач:', error);
        }
      },
    }),
    getTaskById: builder.query<Task, number>({
      query: (id) => `${ENDPOINTS.tasks}/${id}`,
      transformResponse: (response: Response<Task>) => response.data,
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: ENDPOINTS.tasks,
        method: 'POST',
        body: newTask,
      }),
      transformResponse: (response: Response<Task>) => response.data,
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<Task, { id: number; updates: Partial<Task> }>({
      query: ({ id, updates }) => ({
        url: `${ENDPOINTS.tasks}/${id}`,
        method: 'PUT',
        body: updates,
      }),
      transformResponse: (response: Response<Task>) => response.data,
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.tasks}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Task', id }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
