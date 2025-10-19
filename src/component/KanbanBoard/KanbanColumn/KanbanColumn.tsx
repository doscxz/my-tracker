import { Task } from '@/constant/@type';
import CustomButton from '@/shared/CustomButton';
import { ConfirmModalState } from '@/shared/Modal/ConfirmModal';
import { InputModalState } from '@/shared/Modal/InputModal';
import { TaskModalState } from '@/shared/Modal/TaskModal';
import TaskCard from '@/shared/TaskCard';
import { TasksByStatus } from '@/store/selectors/tasksByStatusSelector';
import { moveTask, removeStatus, removeTask } from '@/store/slices/tasksByStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  status: string;
  tasks: (Task | undefined)[];
  selectTask: (task: Task) => void;
  setConfirmModal: Dispatch<SetStateAction<ConfirmModalState>>;
  setInputModal: Dispatch<SetStateAction<InputModalState>>;
  setTaskModal: Dispatch<SetStateAction<TaskModalState>>;
}

const KanbanColumn = ({
  status,
  tasks,
  setConfirmModal,
  setInputModal,
  setTaskModal,
  selectTask,
}: Props) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);
  const tasksByStatus = useAppSelector(TasksByStatus);
  const dispatch = useAppDispatch();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();

    if (!draggedTask || !draggedFromColumn || draggedFromColumn === targetColumnId) {
      setDraggedTask(null);
      setDraggedFromColumn(null);
      return;
    }

    // Используем Redux action для перемещения задачи
    dispatch(
      moveTask({
        taskId: draggedTask.id,
        fromStatus: draggedFromColumn,
        toStatus: targetColumnId,
      })
    );

    setDraggedTask(null);
    setDraggedFromColumn(null);
  };
  const deleteColumn = (status: string) => {
    if (Object.keys(tasksByStatus).length <= 1) {
      setConfirmModal({
        isOpen: true,
        title: 'Невозможно удалить',
        message: 'Нельзя удалить последнюю колонку',
        onConfirm: () => {},
      });
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Удаление колонки',
      message: 'Вы уверены, что хотите удалить эту колонку? Все задачи в ней будут потеряны.',
      onConfirm: () => {
        dispatch(removeStatus(status));
      },
    });
  };
  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask(task);
    setDraggedFromColumn(columnId);
  };
  const deleteTask = (taskId: number, status: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Удаление задачи',
      message: 'Вы уверены, что хотите удалить эту задачу?',
      onConfirm: () => {
        dispatch(removeTask({ status, taskId }));
      },
    });
  };
  const editColumnTitle = (columnId: string) => {
    setInputModal({
      isOpen: true,
      title: 'Редактирование колонки',
      label: 'Название колонки',
      defaultValue: columnId,
      onSubmit: (newTitle: string) => {
        // TODO: Добавить action для переименования колонки в Redux store
        console.log('Переименование колонки:', columnId, '->', newTitle);
      },
    });
  };
  const addNewTask = (status: string) => {
    setTaskModal({
      isOpen: true,
      status,
    });
  };
  console.log(tasks);
  return (
    <div
      key={status}
      className="bg-white rounded-lg shadow-md p-4 min-w-80 max-w-80 flex-shrink-0 hover:shadow-lg transition-shadow duration-200"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, status)}
    >
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-blue-600"
          onClick={() => editColumnTitle(status)}
          title="Нажмите для редактирования"
        >
          {status}
        </h2>
        <div className="flex gap-2">
          <CustomButton
            className="text-green-500 hover:text-green-600 "
            kind="Borderless"
            label="+ Задача"
            onClick={() => addNewTask(status)}
          />
          <CustomButton
            className="text-red-500 hover:text-red-600"
            kind="Borderless"
            label="✕"
            onClick={() => deleteColumn(status)}
          />
        </div>
      </div>
      <div className="space-y-3 min-h-32">
        {tasks.map(
          (task) =>
            task && (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={() => deleteTask(task.id, status)}
                handleDragStart={() => handleDragStart(task, status)}
                selectTask={selectTask}
              />
            )
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
