import { Task } from '@/constant/@type';
import type React from 'react';

interface Props {
  selectTask?: (task: Task) => void;
  handleDragStart?: () => void;
  deleteTask: (e: React.MouseEvent<HTMLButtonElement>) => void;
  task: Task;
}

const TaskCard = ({ selectTask, deleteTask, handleDragStart, task }: Props) => {
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-gray-50 p-3 rounded-lg border border-gray-200 cursor-move hover:shadow-md transition-shadow group"
      onClick={() => selectTask?.(task)}
      data-cy={`task-card-${task.id}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium text-gray-800 mb-1" data-cy={`task-title-${task.id}`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-600" data-cy={`task-description-${task.id}`}>
            {task.description}
          </p>
        </div>
        <button
          onClick={(e) => deleteTask(e)}
          className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
          title="Удалить задачу"
          data-cy={`delete-task-button-${task.id}`}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
