'use client';
import TaskInfo from '@/component/TaskInfo/TaskInfo';
import TasksBar from '@/component/TasksBar/TasksBar';
import { Task } from '@/constant/@type';
import { useGetTasksQuery } from '@/store/api/tasksApi';
import { useAppSelector } from '@/store/store';
import { useState, useEffect } from 'react';
import { TasksWithoutStatuses } from '@/store/selectors/tasksByStatusSelector';

const TaskComponent = () => {
  const [selectTask, setSelectTask] = useState<Task | null>(null);
  const tasks = useAppSelector(TasksWithoutStatuses);

  // Синхронизируем выбранную задачу с обновленными данными из store
  useEffect(() => {
    if (selectTask && tasks) {
      const updatedTask = tasks.find((task) => task.id === selectTask.id);
      if (updatedTask) {
        setSelectTask(updatedTask);
      }
    }
  }, [tasks]);

  return (
    <div className="flex w-full">
      <TasksBar selectTask={selectTask} setSelectTask={setSelectTask} />
      <TaskInfo selectTask={selectTask} />
    </div>
  );
};

export default TaskComponent;
