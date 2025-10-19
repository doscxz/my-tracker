'use client';
import SideBar from '@/shared/SideBar';
import TaskCard from '@/shared/TaskCard';
import { Task } from '@/constant/@type';
import { useDeleteTaskMutation } from '@/store/api/tasksApi';

interface Props {
  tasks: Task[];
  selectedTask: (task: Task) => void;
}

const TasksBar = ({ tasks, selectedTask }: Props) => {
  const [deleteTaskMutation] = useDeleteTaskMutation();

  const deleteTask = async (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteTaskMutation(taskId).unwrap();
    } catch (error) {
      console.error('Ошибка при удалении таска:', error);
    }
  };

  const selectTask = (task: Task) => {
    selectedTask(task);
  };

  return (
    <SideBar styles="flex flex-col gap-5 bg-linear-to-t to-sky-800 from-blue-900 px-[16px] py-[24px] border-r-1 border-indigo-100">
      <div className="flex flex-col w-2xs gap-2 overflow-y-scroll">
        {tasks.map((task) => (
          <TaskCard
            selectTask={selectTask}
            deleteTask={(e) => deleteTask(task.id, e)}
            task={task}
            key={task.id}
          />
        ))}
      </div>
    </SideBar>
  );
};

export default TasksBar;
