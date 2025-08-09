'use client';

import { useState } from 'react';
import TaskCard from '@/shared/TaskCard';
import ConfirmModal, { ConfirmModalState } from '@/shared/Modal/ConfirmModal';
import InputModal, { InputModalState } from '@/shared/Modal/InputModal';
import TaskModal, { TaskModalState } from '@/shared/Modal/TaskModal';
import KanbanModals from '@/component/KanbanBoard/KanbanModals/KanbanModals';

export type Task = {
  id: string;
  title: string;
  description: string;
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const KanbanBoard = () => {
  // TODO Полусать данные с бд
  const [columns, setColumns] = useState<Column[]>([
    {
      id: '1',
      title: 'К выполнению',
      tasks: [
        { id: '1', title: 'Задача 1', description: 'Описание задачи 1' },
        { id: '2', title: 'Задача 2', description: 'Описание задачи 2' },
      ],
    },
    {
      id: '2',
      title: 'В процессе',
      tasks: [{ id: '3', title: 'Задача 3', description: 'Описание задачи 3' }],
    },
    {
      id: '3',
      title: 'Выполнено',
      tasks: [{ id: '4', title: 'Задача 4', description: 'Описание задачи 4' }],
    },
  ]);

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
    columnId: '',
  });

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask(task);
    setDraggedFromColumn(columnId);
  };

  const addNewColumn = () => {
    const newColumn: Column = {
      id: Date.now().toString(),
      title: 'Новая колонка',
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  const handleTaskCreate = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
    };

    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === taskModal.columnId ? { ...column, tasks: [...column.tasks, newTask] } : column
      )
    );
  };

  const deleteTask = (taskId: string, columnId: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Удаление задачи',
      message: 'Вы уверены, что хотите удалить эту задачу?',
      onConfirm: () => {
        setColumns((prevColumns) =>
          prevColumns.map((column) =>
            column.id === columnId
              ? { ...column, tasks: column.tasks.filter((task) => task.id !== taskId) }
              : column
          )
        );
      },
    });
  };
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
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

    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks:
          column.id === draggedFromColumn
            ? column.tasks.filter((task) => task.id !== draggedTask.id)
            : column.id === targetColumnId
              ? [...column.tasks, draggedTask]
              : column.tasks,
      }))
    );

    setDraggedTask(null);
    setDraggedFromColumn(null);
  };
  const editColumnTitle = (columnId: string) => {
    const currentColumn = columns.find((col) => col.id === columnId);

    setInputModal({
      isOpen: true,
      title: 'Редактирование колонки',
      label: 'Название колонки',
      defaultValue: currentColumn?.title || '',
      onSubmit: (newTitle: string) => {
        setColumns((prevColumns) =>
          prevColumns.map((column) =>
            column.id === columnId ? { ...column, title: newTitle } : column
          )
        );
      },
    });
  };
  const addNewTask = (columnId: string) => {
    setTaskModal({
      isOpen: true,
      columnId,
    });
  };
  const deleteColumn = (columnId: string) => {
    if (columns.length <= 1) {
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
        setColumns(columns.filter((column) => column.id !== columnId));
      },
    });
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Kanban Доска</h1>
        <button
          onClick={addNewColumn}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Добавить колонку
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-white rounded-lg shadow-md p-4 min-w-80 max-w-80"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex justify-between items-center mb-4">
              {/* TODO вынести в отдельный компонент логика которая касается только колонки должна быть внутри*/}
              <h2
                className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-blue-600"
                onClick={() => editColumnTitle(column.id)}
                title="Нажмите для редактирования"
              >
                {column.title}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => addNewTask(column.id)}
                  className="text-green-500 hover:text-green-600 text-sm"
                  title="Добавить задачу"
                >
                  + Задача
                </button>
                <button
                  onClick={() => deleteColumn(column.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                  title="Удалить колонку"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-3 min-h-32">
              {column.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  deleteTask={() => deleteTask(task.id, column.id)}
                  handleDragStart={() => handleDragStart(task, column.id)}
                />
              ))}
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
      />
    </div>
  );
};

export default KanbanBoard;
