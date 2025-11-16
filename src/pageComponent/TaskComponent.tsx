'use client';
import TaskInfo from '@/component/TaskInfo/TaskInfo';
import TasksBar from '@/component/TasksBar/TasksBar';
import { Task } from '@/constant/@type';
import { useState, useEffect } from 'react';
import Modal from '@/shared/Modal/Modal';
import useWindowSize from '@/shared/hooks/useWindowSize';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/storeMobX/StoreContext';

const TaskComponent = observer(() => {
  const [selectTask, setSelectTask] = useState<Task | null>(null);
  const store = useStore();
  const tasks = store.tasksByStatus.tasksWithoutStatuses;
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768 ? true : false;

  useEffect(() => {
    if (selectTask && tasks) {
      const updatedTask = tasks.find((task) => task.id === selectTask.id);
      if (updatedTask) {
        setSelectTask(updatedTask);
      }
    }
  }, [selectTask]);
  return (
    <div className="flex w-full min-h-screen">
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
});

export default TaskComponent;
