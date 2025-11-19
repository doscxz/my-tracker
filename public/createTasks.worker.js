// Web Worker для создания задач
const WORKER_ACTION = {
  TaskProgress: 'TASK_PROGRESS',
  TasksComplete: 'TASKS_COMPLETE',
  CreateTasks: 'CREATE_TASKS',
};
/**
 * Обязательно должен находиться в public и иметь расширение .worker.js
 */
self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type === WORKER_ACTION.CreateTasks) {
    const { status, baseTask, count, delay } = payload;
    const createdTasks = [];

    const baseId = Date.now();

    for (let i = 0; i < count; i++) {
      // Искусственная задержка
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const task = {
        id: baseId + i,
        title: baseTask.title + ' ' + (i + 1),
        description: baseTask.description + ' (Задача #' + (i + 1) + ')',
        status: status,
        details: {
          type: baseTask.details.type,
          priority: baseTask.details.priority,
          tags: baseTask.details.tags + ' #' + (i + 1),
        },
        comments: [],
      };

      createdTasks.push(task);

      self.postMessage({
        type: WORKER_ACTION.TaskProgress,
        payload: { created: i + 1 },
      });
    }

    self.postMessage({
      type: WORKER_ACTION.TasksComplete,
      payload: { tasks: createdTasks },
    });
  }
};

self.onerror = (error) => {
  console.error('Worker error:', error);
};
