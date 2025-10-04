'use client';
import { useState } from 'react';
import { ConfirmModalState } from '@/shared/Modal/ConfirmModal';
import { InputModalState } from '@/shared/Modal/InputModal';
import { onSubmitTaskModal, TaskModalState } from '@/shared/Modal/TaskModal';
import KanbanModals from '@/component/KanbanBoard/KanbanModals/KanbanModals';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TasksByStatus } from '@/store/selectors/tasksByStatusSelector';
import {
  addStatus,
  createTask,
  removeStatus,
  removeTask,
  moveTask,
  TypeTask,
} from '@/store/slices/tasksByStatusSlice';
import { StatusModalState } from '@/shared/Modal/StatusModal';
import TaskCard from '@/shared/TaskCard';

const KanbanBoard = () => {
  const tasksByStatus = useAppSelector(TasksByStatus);
  console.log(tasksByStatus);
  const dispatch = useAppDispatch();
  // Modal states
  // TODO хук на state modal - сократит код, улучшит читаемость
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const [inputModal, setInputModal] = useState<InputModalState>({
    isOpen: false,
    title: '',
    label: '',
    defaultValue: '',
    onSubmit: () => {},
  });

  const [taskModal, setTaskModal] = useState<TaskModalState>({
    isOpen: false,
    status: '',
  });
  const [statusModal, setStatusModal] = useState<StatusModalState>({
    isOpen: false,
    handleClose: () => {},
  });
  const handleDragStart = (task: TypeTask, columnId: string) => {
    setDraggedTask(task);
    setDraggedFromColumn(columnId);
  };

  const addNewColumn = () => {
    setStatusModal((prev) => ({ ...prev, isOpen: true }));
  };
  const handleStatusCreate = (status: string) => {
    dispatch(addStatus(status));
  };
  const handleTaskCreate: onSubmitTaskModal = (status, title, description) => {
    dispatch(createTask({ status, title, description }));
  };

  const deleteTask = (taskId: string, status: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Удаление задачи',
      message: 'Вы уверены, что хотите удалить эту задачу?',
      onConfirm: () => {
        dispatch(removeTask({ status, taskId }));
      },
    });
  };
  const [draggedTask, setDraggedTask] = useState<TypeTask | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);

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
  return (
    <div className="p-6 bg-gray-100 min-h-screen w-[calc(100vw-313px)]">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Kanban Доска</h1>
        <button
          onClick={addNewColumn}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Добавить колонку
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 w-full scrollbar-hide">
        {Object.entries(tasksByStatus).map(([status, tasks]) => (
          <div
            key={status}
            className="bg-white rounded-lg shadow-md p-4 min-w-80 max-w-80 flex-shrink-0 hover:shadow-lg transition-shadow duration-200"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="flex justify-between items-center mb-4">
              {/* TODO вынести в отдельный компонент логика которая касается только колонки должна быть внутри*/}
              <h2
                className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-blue-600"
                onClick={() => editColumnTitle(status)}
                title="Нажмите для редактирования"
              >
                {status}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => addNewTask(status)}
                  className="text-green-500 hover:text-green-600 text-sm"
                  title="Добавить задачу"
                >
                  + Задача
                </button>
                <button
                  onClick={() => deleteColumn(status)}
                  className="text-red-500 hover:text-red-600 text-sm"
                  title="Удалить колонку"
                >
                  ✕
                </button>
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
                    />
                  )
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Modals */}
      <KanbanModals
        confirmModal={confirmModal}
        inputModal={inputModal}
        setConfirmModal={setConfirmModal}
        setInputModal={setInputModal}
        taskModal={taskModal}
        setTaskModal={setTaskModal}
        handleTaskCreate={handleTaskCreate}
        statusModal={statusModal}
        setCloseModalStatus={setStatusModal}
        handleStatusCreate={handleStatusCreate}
      />
    </div>
  );
};

export default KanbanBoard;
