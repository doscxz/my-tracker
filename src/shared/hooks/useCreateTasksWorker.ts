import { useEffect, useRef, useCallback } from 'react';
import { Task, Priority } from '@/constant/@type';
import { TaskCreate, WORKER_ACTION, WorkerOutgoingMessageEvent } from '@/constant/variablesWorker';

export interface UseCreateTasksWorkerOptions {
  onProgress: (created: number) => void;
  onComplete: (tasks: Task[]) => void;
  onError?: (error: Error) => void;
}

export const useCreateTasksWorker = ({
  onProgress,
  onComplete,
  onError,
}: UseCreateTasksWorkerOptions) => {
  const workerRef = useRef<Worker | null>(null);
  const callbacksRef = useRef({
    onProgress,
    onComplete,
    onError,
  });

  useEffect(() => {
    callbacksRef.current = {
      onProgress,
      onComplete,
      onError,
    };
  }, [onProgress, onComplete, onError]);

  useEffect(() => {
    try {
      workerRef.current = new Worker('/createTasks.worker.js');
    } catch (error) {
      callbacksRef.current.onError?.(error as Error);
      return;
    }

    const worker = workerRef.current;

    worker.onmessage = (e: WorkerOutgoingMessageEvent) => {
      const { payload, type } = e.data;
      const { onProgress: onProgressCb, onComplete: onCompleteCb } = callbacksRef.current;

      if (type === WORKER_ACTION.TaskProgress) {
        onProgressCb(payload.created);
      } else if (type === WORKER_ACTION.TasksComplete) {
        onCompleteCb(payload.tasks);
      }
    };

    worker.onerror = (errorEvent: ErrorEvent) => {
      console.error('Create tasks worker error:', errorEvent);
      const error = new Error(errorEvent.message || 'Worker error');
      callbacksRef.current.onError?.(error);
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const createTasks = useCallback(({ status, baseTask, count = 100, delay = 50 }: TaskCreate) => {
    if (!workerRef.current) {
      const error = new Error('Worker error');
      callbacksRef.current.onError?.(error);
      return;
    }

    try {
      workerRef.current.postMessage({
        type: WORKER_ACTION.CreateTasks,
        payload: {
          status,
          baseTask,
          count,
          delay,
        },
      });
    } catch (error) {
      console.error('Failed to worker:', error);
      callbacksRef.current.onError?.(error as Error);
    }
  }, []);

  return { createTasks };
};
