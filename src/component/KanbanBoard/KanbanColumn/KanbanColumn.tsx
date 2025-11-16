import { Task } from '@/constant/@type';
import CustomButton from '@/shared/CustomButton';
import { ConfirmModalState } from '@/shared/Modal/ConfirmModal';
import { InputModalState } from '@/shared/Modal/InputModal';
import { TaskModalState } from '@/shared/Modal/TaskModal';
import TaskCard from '@/shared/TaskCard';
import { Dispatch, SetStateAction, useState } from 'react';
import ButtonsCreateTaskAndDeleteColumn from './ButtonsCreateTaskAndDeleteColumn/ButtonsCreateTaskAndDeleteColumn';
import TaskCardLoading from '@/shared/TaskCardLoading';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/storeMobX/StoreContext';

interface Props {
  status: string;
  tasks: (Task | undefined)[];
  selectTask: (task: Task) => void;
  setConfirmModal: Dispatch<SetStateAction<ConfirmModalState>>;
  setInputModal: Dispatch<SetStateAction<InputModalState>>;
  setTaskModal: Dispatch<SetStateAction<TaskModalState>>;
  isCreatingTask: boolean;
  creatingTaskStatus: string | null;
  draggedTask: Task | null;
  setDraggedTask: Dispatch<SetStateAction<Task | null>>;
  draggedFromColumn: string | null;
  setDraggedFromColumn: Dispatch<SetStateAction<string | null>>;
}

const KanbanColumn = observer(
  ({
    status,
    tasks,
    setConfirmModal,
    setInputModal,
    setTaskModal,
    selectTask,
    isCreatingTask,
    creatingTaskStatus,
    draggedTask,
    setDraggedTask,
    draggedFromColumn,
    setDraggedFromColumn,
  }: Props) => {
    const { tasksByStatus } = useStore();

    const tasksByStatusStore = tasksByStatus.initialState;
    const formatedStatus = status.toLowerCase().replace(/\s+/g, '-');
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
      tasksByStatus.moveTask({
        taskId: draggedTask.id,
        fromStatus: draggedFromColumn,
        toStatus: targetColumnId,
      });

      setDraggedTask(null);
      setDraggedFromColumn(null);
    };
    const deleteColumn = (status: string) => {
      if (Object.keys(tasksByStatusStore).length <= 1) {
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
          tasksByStatus.removeStatus(status);
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
          tasksByStatus.removeTask({ status, taskId });
        },
      });
    };
    const editColumnTitle = (status: string) => {
      setInputModal({
        isOpen: true,
        title: 'Редактирование колонки',
        label: 'Название колонки',
        defaultValue: status,
        onSubmit: (newTitle: string) => {
          // TODO: Добавить action для переименования колонки в Redux store
          console.log('Переименование колонки:', status, '->', newTitle);
        },
      });
    };
    const addNewTask = (status: string) => {
      setTaskModal({
        isOpen: true,
        status,
      });
    };

    return (
      <section
        aria-labelledby={`column-title-${formatedStatus}`}
        className="bg-white rounded-lg shadow-md p-4 min-w-80 max-w-80 flex-shrink-0 hover:shadow-lg transition-shadow duration-200"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, status)}
        data-cy={`kanban-column-${formatedStatus}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            id={`column-title-${formatedStatus}`}
            className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-blue-600"
            onClick={() => editColumnTitle(status)}
            title="Нажмите для редактирования"
            data-cy={`column-title-${formatedStatus}`}
          >
            {status}
          </h2>
          <ButtonsCreateTaskAndDeleteColumn
            addNewTask={addNewTask}
            deleteColumn={deleteColumn}
            status={status}
          />
        </div>
        <ul className="space-y-3 min-h-32" data-cy={`tasks-container-${formatedStatus}`}>
          {tasks.map(
            (task) =>
              task && (
                <li key={task.id}>
                  <TaskCard
                    task={task}
                    deleteTask={() => deleteTask(task.id, status)}
                    handleDragStart={() => handleDragStart(task, status)}
                    selectTask={selectTask}
                  />
                </li>
              )
          )}
          {isCreatingTask && creatingTaskStatus === status && <TaskCardLoading />}
        </ul>
      </section>
    );
  }
);

export default KanbanColumn;
