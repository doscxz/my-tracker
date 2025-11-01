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
import TaskInfo from '../TaskInfo/TaskInfo';

const KanbanBoard = () => {
  // Use custom hook for modal state management
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

  const addNewColumn = () => {
    openStatusModal();
  };
  const handleStatusCreate = (status: string) => {
    dispatch(addStatus(status));
  };
  const handleTaskCreate: onSubmitTaskModal = async (task) => {
    try {
      await createTaskMutation(task).unwrap();
      dispatch(createTask(task));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectTask = (task: Task) => {
    if (selectTask?.id === task.id) {
      setSelectTask(null);
      return;
    }
    setSelectTask(task);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-[calc(100vw-313px)]" data-cy="kanban-board">
      <div className="flex justify-between">
        <div className="w-full overflow-auto">
          <div className="mb-6 flex  justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800" data-cy="kanban-title">
              Kanban Доска
            </h1>
            <CustomButton
              label="Добавить колонку"
              onClick={addNewColumn}
              data-cy="add-column-button"
            />
          </div>
          <div
            className="flex gap-6 overflow-x-auto pb-6 w-full scrollbar-hide"
            data-cy="kanban-columns-container"
          >
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
              <KanbanColumn
                key={status}
                status={status}
                tasks={tasks}
                setConfirmModal={setConfirmModal}
                setInputModal={setInputModal}
                setTaskModal={setTaskModal}
                selectTask={handleSelectTask}
                isCreatingTask={isCreatingTask}
              />
            ))}
          </div>
        </div>
        {selectTask && (
          <div
            className="border-2 h-[100vh] border-amber-400 max-h-[100vh] translate-y-[-24px] translate-x-[24px]  overflow-y-scroll"
            data-cy="task-info-panel"
          >
            <TaskInfo selectTask={selectTask} />
          </div>
        )}
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
    </div>
  );
};

export default KanbanBoard;
