'use client';
import { useState } from 'react';
import { onSubmitTaskModal } from '@/shared/Modal/TaskModal';
import KanbanModals from '@/component/KanbanBoard/KanbanModals/KanbanModals';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TasksByStatus } from '@/store/selectors/tasksByStatusSelector';
import { addStatus, createTask } from '@/store/slices/tasksByStatusSlice';
import CustomButton from '@/shared/CustomButton';
import { useCreateTaskMutation, useGetTasksQuery } from '@/store/api/tasksApi';
import KanbanColumn from './KanbanColumn/KanbanColumn';
import { useModalState } from '@/shared/hooks';
import { Task } from '@/constant/@type';
import InformationSelectTask from './InformationSelectTask/InformationSelectTask';

const KanbanBoard = () => {
  const {
    confirmModal,
    inputModal,
    taskModal,
    statusModal,
    setConfirmModal,
    setInputModal,
    setTaskModal,
    setStatusModal,
    openStatusModal,
  } = useModalState();
  const tasksByStatus = useAppSelector(TasksByStatus);
  const dispatch = useAppDispatch();
  const [selectTask, setSelectTask] = useState<Task | null>(null);
  const [createTaskMutation, { isLoading: isCreatingTask }] = useCreateTaskMutation();
  const [creatingTaskStatus, setCreatingTaskStatus] = useState<string | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);

  const addNewColumn = () => {
    openStatusModal();
  };
  const handleStatusCreate = (status: string) => {
    dispatch(addStatus(status));
  };
  const handleTaskCreate: onSubmitTaskModal = async (task) => {
    try {
      setCreatingTaskStatus(task.status);
      await createTaskMutation(task).unwrap;
      console.log('1. [View] Пользователь нажал кнопку для создание задачи');
      console.log('2. [Action] Диспатчим action...');
      dispatch(createTask(task));
    } catch (e) {
      console.error(e);
    } finally {
      setCreatingTaskStatus(null);
    }
  };
  console.log('6. [View] Рендер компонента с значением:', tasksByStatus);
  const handleSelectTask = (task: Task) => {
    if (selectTask?.id === task.id) {
      setSelectTask(null);
      return;
    }
    setSelectTask(task);
  };

  return (
    <section className="p-6 bg-gray-100 h-screen w-full" data-cy="kanban-board">
      <div className="flex justify-between">
        <div className="w-full overflow-auto">
          <header className="mb-6 flex justify-between items-center">
            <h1 className="text-[18px] font-bold text-gray-800 md:text-3xl" data-cy="kanban-title">
              Kanban Доска
            </h1>
            <CustomButton
              label="Добавить колонку"
              onClick={addNewColumn}
              data-cy="add-column-button"
            />
          </header>

          <div
            className="flex gap-6 overflow-x-auto pb-6 w-full scrollbar-hide"
            data-cy="kanban-columns-container"
            role="list"
          >
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
              <div role="listitem" key={status}>
                <KanbanColumn
                  status={status}
                  tasks={tasks}
                  setConfirmModal={setConfirmModal}
                  setInputModal={setInputModal}
                  setTaskModal={setTaskModal}
                  selectTask={handleSelectTask}
                  isCreatingTask={isCreatingTask}
                  creatingTaskStatus={creatingTaskStatus}
                  draggedTask={draggedTask}
                  draggedFromColumn={draggedFromColumn}
                  setDraggedTask={setDraggedTask}
                  setDraggedFromColumn={setDraggedFromColumn}
                />
              </div>
            ))}
          </div>
        </div>
        <aside aria-label="Информация о выбранной задаче">
          <InformationSelectTask selectTask={selectTask} setSelectTask={setSelectTask} />
        </aside>
      </div>
      {/* Modals */}
      <KanbanModals
        confirmModal={confirmModal}
        inputModal={inputModal}
        taskModal={taskModal}
        statusModal={statusModal}
        setConfirmModal={setConfirmModal}
        setInputModal={setInputModal}
        setTaskModal={setTaskModal}
        setCloseModalStatus={setStatusModal}
        handleTaskCreate={handleTaskCreate}
        handleStatusCreate={handleStatusCreate}
      />
    </section>
  );
};

export default KanbanBoard;
