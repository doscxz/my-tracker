import { useEffect, useRef, useCallback, useState } from 'react';
import { Task } from '@/constant/@type';
import { WORKER_ACTION, WorkerOutgoingMessageEvent } from '@/constant/variablesWorker';

export const useRenderTasksWorker = () => {
  const workerRef = useRef<Worker | null>(null);
  const [renderTasks, setRenderTasks] = useState<Task[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Создаем воркер из public папки
    try {
      workerRef.current = new Worker('/renderTasks.worker.js');
    } catch (error) {
      console.error('Failed to create render worker:', error);
    }

    if (!workerRef.current) return;

    const worker = workerRef.current;

    worker.onmessage = (e: WorkerOutgoingMessageEvent) => {
      const { type, payload } = e.data;

      if (type === WORKER_ACTION.RenderReady) {
        setRenderTasks(payload.renderTasks);
        setIsProcessing(false);
      }
    };

    worker.onerror = (errorEvent: ErrorEvent) => {
      console.error('Render worker error:', errorEvent);
      setIsProcessing(false);
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const prepareRender = useCallback((tasks?: Task[]) => {
    if (workerRef.current) {
      setIsProcessing(true);
      workerRef.current.postMessage({
        type: WORKER_ACTION.PrepareRender,
        payload: {
          tasks: tasks || [],
        },
      });
    }
  }, []);

  return { renderTasks, prepareRender, isProcessing };
};
