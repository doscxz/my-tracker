import { Priority, Task } from './@type';

export enum WORKER_ACTION {
  TaskProgress = 'TASK_PROGRESS',
  TasksComplete = 'TASKS_COMPLETE',
  CreateTasks = 'CREATE_TASKS',
  PrepareRender = 'PREPARE_RENDER',
  RenderReady = 'RENDER_READY',
}

export const WORKER_TYPE_ACTION = {
  [WORKER_ACTION.TaskProgress]: 'TASK_PROGRESS',
  [WORKER_ACTION.TasksComplete]: 'TASKS_COMPLETE',
  [WORKER_ACTION.CreateTasks]: 'CREATE_TASKS',
  [WORKER_ACTION.PrepareRender]: 'PREPARE_RENDER',
  [WORKER_ACTION.RenderReady]: 'RENDER_READY',
};

export type BaseTask = {
  title: string;
  description: string;
  details: {
    type: string;
    priority: Priority;
    tags: string;
  };
};

export type TaskCreate = {
  status: string;
  baseTask: BaseTask;
  count: number;
  delay: number;
};
export type WorkerTaskProgressMessage = {
  type: WORKER_ACTION.TaskProgress;
  payload: { created: number };
};

export type WorkerTasksCompleteMessage = {
  type: WORKER_ACTION.TasksComplete;
  payload: { tasks: Task[] };
};

export type WorkerTasksPrepareRenderMessage = {
  type: WORKER_ACTION.PrepareRender;
  payload: { tasks: Task[] };
};

export type WorkerTasksRenderReadyMessage = {
  type: WORKER_ACTION.RenderReady;
  payload: { renderTasks: Task[] };
};

export type WorkerTasksCreateMessage = {
  type: WORKER_ACTION.CreateTasks;
  payload: TaskCreate;
};

// Сообщения, которые воркер отправляет (исходящие)
export type WorkerOutgoingMessage =
  | WorkerTaskProgressMessage
  | WorkerTasksCompleteMessage
  | WorkerTasksRenderReadyMessage;

// Сообщения, которые воркер получает (входящие)
export type WorkerIncomingMessage = WorkerTasksPrepareRenderMessage | WorkerTasksCreateMessage;

export type WorkerMessage = WorkerOutgoingMessage | WorkerIncomingMessage;

// Типы для событий
export type WorkerMessageEvent = MessageEvent<WorkerMessage>;
export type WorkerIncomingMessageEvent = MessageEvent<WorkerIncomingMessage>;
export type WorkerOutgoingMessageEvent = MessageEvent<WorkerOutgoingMessage>;
