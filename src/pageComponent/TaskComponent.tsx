'use client';
import TaskInfo from '@/component/TaskInfo/TaskInfo';
import TasksBar from '@/component/TasksBar/TasksBar';
import { Task } from '@/constant/@type';
import { useGetTasksQuery } from '@/store/api/tasksApi';
import { useState } from 'react';

const TaskComponent = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [selectTask, setSelectTask] = useState<Task | null>(null);

  const selectedTask = (task: Task) => {
    setSelectTask(task);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка при загрузке тасков</div>;
  }

  return (
    <div className="flex w-full">
      {tasks && <TasksBar selectedTask={selectedTask} tasks={tasks} />}
      <TaskInfo selectTask={selectTask} />
    </div>
  );
};

export default TaskComponent;
