'use client';
import SideBar from '@/shared/SideBar';
import TaskCard from '@/shared/TaskCard';
import { Task } from '@/constant/@type';
import { useStore } from '@/storeMobX/StoreContext';
import { observer } from 'mobx-react-lite';

interface Props {
  setSelectTask: (task: Task | null) => void;
  selectTask: Task | null;
}

const TasksBar = observer(({ selectTask, setSelectTask }: Props) => {
  const store = useStore();
  const { tasksByStatus, tasksApi } = store;

  const { isLoading, error } = tasksApi;
  const tasks = tasksByStatus.tasksWithoutStatuses;
  const hasTasks = Boolean(tasks);

  const deleteTask = async (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    tasksByStatus.removeTask({ taskId: task.id, status: task.status });
    if (task.id === selectTask?.id) {
      setSelectTask(null);
    }
  };

  const selectedTask = (task: Task) => {
    setSelectTask(task);
  };

  return (
    <SideBar styles=" flex flex-col gap-5 bg-linear-to-t to-sky-800 from-blue-900 px-[16px] py-[24px] border-r-1 border-indigo-100 w-full md:w-[286px]">
      <div className="flex flex-col w-2xs gap-2 overflow-y-scroll scrollbar-hide">
        {isLoading && <span>...Загрузка</span>}
        {error && <span>Произошла ошибка</span>}
        {!isLoading && !error && (
          <div className="flex flex-col gap-1">
            {hasTasks ? (
              tasks!.map((task) => (
                <TaskCard
                  selectTask={selectedTask}
                  deleteTask={(e) => deleteTask(e, task)}
                  task={task}
                  key={task.id}
                />
              ))
            ) : (
              <span>Нет задач</span>
            )}
          </div>
        )}
      </div>
    </SideBar>
  );
});

export default TasksBar;
