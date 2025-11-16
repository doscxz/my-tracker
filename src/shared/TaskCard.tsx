'use client';
import { Task } from '@/constant/@type';
import type React from 'react';
import { observer } from 'mobx-react-lite';

interface Props {
  selectTask?: (task: Task) => void;
  handleDragStart?: () => void;
  deleteTask: (e: React.MouseEvent) => void;
  task: Task;
}

const TaskCard = observer(({ selectTask, deleteTask, handleDragStart, task }: Props) => {
  return (
    <article
      draggable
      onDragStart={handleDragStart}
      className="bg-gray-50 p-3 rounded-lg border border-gray-200 cursor-move hover:shadow-md transition-shadow"
      onClick={() => selectTask?.(task)}
      data-cy={`task-card-${task.id}`}
      aria-label={`Задача ${task.title}`}
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
          type="button"
          onClick={deleteTask}
          className="text-red-400 hover:text-red-600 ml-2"
          title="Удалить задачу"
          aria-label={`Удалить задачу ${task.title}`}
          data-cy={`delete-task-button-${task.id}`}
        >
          ✕
        </button>
      </div>
    </article>
  );
});

export default TaskCard;
