'use client';
import TaskInfo from '@/component/TaskInfo/TaskInfo';
import TasksBar from '@/component/TasksBar/TasksBar';
import { useState } from 'react';
type Task = {
  id: string;
  title: string;
  description: string;
};
export type allTasks = {
  id: string;
  title: string;
  tasks: Task[];
};
const initialTasks: allTasks[] = [
  {
    id: '1',
    title: 'К выполнению',
    tasks: [
      { id: '1', title: 'Задача 1', description: 'Описание задачи 1' },
      { id: '2', title: 'Задача 2', description: 'Описание задачи 2' },
    ],
  },
  {
    id: '2',
    title: 'В процессе',
    tasks: [{ id: '3', title: 'Задача 3', description: 'Описание задачи 3' }],
  },
  {
    id: '3',
    title: 'Выполнено',
    tasks: [{ id: '4', title: 'Задача 4', description: 'Описание задачи 4' }],
  },
];
const TaskPage = () => {
  const [allTasks, setAllTasks] = useState<allTasks[]>(initialTasks);
  const [selectTask, setSelectTask] = useState<Task | null>(null);
  const selectedTask = (task: Task) => {
    setSelectTask(task);
  };
  return (
    <div className="flex w-full">
      <TasksBar selectedTask={selectedTask} tasks={allTasks} setTasks={setAllTasks} />
      <TaskInfo selectTask={selectTask} />
    </div>
  );
};

export default TaskPage;
