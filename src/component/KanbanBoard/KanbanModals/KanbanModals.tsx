import ConfirmModal, { ConfirmModalState } from '@/shared/Modal/ConfirmModal';
import InputModal, { InputModalState } from '@/shared/Modal/InputModal';
import TaskModal, { TaskModalState } from '@/shared/Modal/TaskModal';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  confirmModal: ConfirmModalState;
  inputModal: InputModalState;
  setConfirmModal: Dispatch<SetStateAction<ConfirmModalState>>;
  setInputModal: Dispatch<SetStateAction<InputModalState>>;
  setTaskModal: Dispatch<SetStateAction<TaskModalState>>;
  taskModal: TaskModalState;
  handleTaskCreate: (title: string, description: string) => void;
}

const KanbanModals = ({
  setTaskModal,
  taskModal,
  confirmModal,
  inputModal,
  setConfirmModal,
  setInputModal,
  handleTaskCreate,
}: Props) => {
  return (
    <>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />

      <InputModal
        isOpen={inputModal.isOpen}
        onClose={() => setInputModal({ ...inputModal, isOpen: false })}
        onSubmit={inputModal.onSubmit}
        title={inputModal.title}
        label={inputModal.label}
        defaultValue={inputModal.defaultValue}
      />

      <TaskModal
        isOpen={taskModal.isOpen}
        onClose={() => setTaskModal({ ...taskModal, isOpen: false })}
        onSubmit={handleTaskCreate}
        title="Создание новой задачи"
      />
    </>
  );
};

export default KanbanModals;
