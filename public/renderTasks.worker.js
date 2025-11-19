// Web Worker для подготовки данных отрисовки
const WORKER_ACTION = {
  PrepareRender: 'PREPARE_RENDER',
  RenderReady: 'RENDER_READY',
};
/**
 * Обязательно должен находиться в public и иметь расширение .worker.js
 */
self.onmessage = (e) => {
  const { type, payload } = e.data;

  if (type === WORKER_ACTION.PrepareRender) {
    const { tasks } = payload;

    const renderTasks = tasks.filter((task) => task !== undefined && task !== null);
    self.postMessage({
      type: WORKER_ACTION.RenderReady,
      payload: {
        renderTasks,
      },
    });
  }
};

self.onerror = (error) => {
  console.error('Render worker error:', error);
};
