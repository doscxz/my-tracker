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
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: ENDPOINTS.tasks,
        method: 'POST',
        body: task,
      }),
      transformResponse: (response: Response<Task>) => response.data,
      invalidatesTags: ['Task'],
    }),
    getTaskById: builder.query<Task, number>({
      query: (id) => `${ENDPOINTS.tasks}/${id}`,
      transformResponse: (response: Response<Task>) => response.data,
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),
  }),
});

export const { useGetTasksQuery, useGetTaskByIdQuery, useCreateTaskMutation } = tasksApi;
