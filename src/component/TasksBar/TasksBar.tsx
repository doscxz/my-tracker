'use client';
import SideBar from '@/shared/SideBar';
import TaskCard from '@/shared/TaskCard';
import { Dispatch, SetStateAction } from 'react';
import { allTasks } from '@/app/task/page';
import { Task } from '@/component/KanbanBoard/KanbanBoard';

interface Props {
  tasks: allTasks[];
  setTasks: Dispatch<SetStateAction<allTasks[]>>;
  selectedTask: (task: Task) => void;
}

const TasksBar = ({ tasks, setTasks, selectedTask }: Props) => {
  const deleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((group) => ({
        ...group,
        tasks: group.tasks.filter((task) => task.id !== taskId),
      }))
    );
  };
  const selectTask = (task: Task) => {
    selectedTask(task);
  };
  return (
    <SideBar styles="flex flex-col gap-5 bg-linear-to-t to-sky-800 from-blue-900 px-[16px] py-[24px] border-r-1 border-indigo-100">
      <div className="flex flex-col w-2xs gap-2 overflow-y-scroll">
        {tasks.map(({ title, tasks, id }) =>
          tasks.map((task) => (
            <TaskCard
              selectTask={selectTask}
              deleteTask={() => deleteTask(task.id)}
              task={task}
              key={task.id}
            />
          ))
        )}
      </div>
    </SideBar>
  );
};

export default TasksBar;
