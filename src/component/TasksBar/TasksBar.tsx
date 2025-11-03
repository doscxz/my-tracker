'use client';
import SideBar from '@/shared/SideBar';
import TaskCard from '@/shared/TaskCard';
import { Task } from '@/constant/@type';
import { useGetTasksQuery } from '@/store/api/tasksApi';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TasksWithoutStatuses } from '@/store/selectors/tasksByStatusSelector';
import { removeTask } from '@/store/slices/tasksByStatusSlice';

interface Props {
  setSelectTask: (task: Task | null) => void;
  selectTask: Task | null;
}

const TasksBar = ({ selectTask, setSelectTask }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useGetTasksQuery();
  const tasks = useAppSelector(TasksWithoutStatuses);
  const hasTasks = Boolean(tasks);

  const deleteTask = async (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeTask({ taskId: task.id, status: task.status }));
    if (task.id === selectTask?.id) {
      setSelectTask(null);
    }
  };

  const selectedTask = (task: Task) => {
    setSelectTask(task);
  };

  return (
    <SideBar styles=" flex flex-col gap-5 bg-linear-to-t to-sky-800 from-blue-900 px-[16px] py-[24px] border-r-1 border-indigo-100 w-full md:w-[286px]">
      <div className="flex flex-col w-2xs gap-2 overflow-y-scroll">
        {isLoading && <span>...Загрузка</span>}
        {error && <span>Произошла ошибка</span>}
        {!isLoading && !error && (
          <div>
            {hasTasks ? (
              tasks!.map((task) => (
                <TaskCard
                  selectTask={selectedTask}
                  deleteTask={(e) => deleteTask(task, e)}
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
};

export default TasksBar;
