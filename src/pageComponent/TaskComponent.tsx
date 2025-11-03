'use client';
import TaskInfo from '@/component/TaskInfo/TaskInfo';
import TasksBar from '@/component/TasksBar/TasksBar';
import { Task } from '@/constant/@type';
import { useGetTasksQuery } from '@/store/api/tasksApi';
import { useAppSelector } from '@/store/store';
import { useState, useEffect } from 'react';
import { TasksWithoutStatuses } from '@/store/selectors/tasksByStatusSelector';
import Modal from '@/shared/Modal/Modal';
import useWindowSize from '@/shared/hooks/useWindowSize';

const TaskComponent = () => {
  const [selectTask, setSelectTask] = useState<Task | null>(null);
  const tasks = useAppSelector(TasksWithoutStatuses);
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768 ? true : false;

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
      <div className="hidden w-full md:block">
        <TaskInfo selectTask={selectTask} />
      </div>
      {isMobile && (
        <Modal
          isOpen={Boolean(selectTask)}
          onClose={() => setSelectTask(null)}
          title="Task Information"
        >
          <TaskInfo selectTask={selectTask} />
        </Modal>
      )}
    </div>
  );
};

export default TaskComponent;
