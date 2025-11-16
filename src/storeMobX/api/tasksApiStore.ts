import { makeAutoObservable, runInAction } from 'mobx';
import { Task } from '@/constant/@type';
import { API_BASE_URL } from '@/constant/common';
import { ENDPOINTS } from '@/constant/endpoints';
import { Response } from '@/api/@type/response';
import { RootStore } from '../store';

class TasksApiStore {
  isLoading = false;
  error: Error | null = null;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async getTasks(): Promise<Task[]> {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.tasks}`);
      const data: Response<Task[]> = await response.json();
      const tasks = data.data;

      // Распределяет задачи по статусам
      this.rootStore.tasksByStatus.distributeTasksByStatus({ tasks });

      return tasks;
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
      console.error('Ошибка при получении задач:', error);
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async createTask(task: Partial<Task>): Promise<Task> {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.tasks}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data: Response<Task> = await response.json();
      return data.data;
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
      console.error('Ошибка при получении задач:', error);
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async getTaskById(id: number): Promise<Task> {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.tasks}/${id}`);
      const data: Response<Task> = await response.json();
      return data.data;
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
      console.error('Ошибка при получении задач:', error);
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export default TasksApiStore;
