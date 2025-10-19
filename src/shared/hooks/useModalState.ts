import { useState } from 'react';
import { ConfirmModalState } from '@/shared/Modal/ConfirmModal';
import { InputModalState } from '@/shared/Modal/InputModal';
import { TaskModalState } from '@/shared/Modal/TaskModal';
import { StatusModalState } from '@/shared/Modal/StatusModal';

export const useModalState = () => {
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

  // Helper functions for opening modals
  const openConfirmModal = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm,
    });
  };

  const openInputModal = (
    title: string,
    label: string,
    defaultValue: string = '',
    onSubmit: (value: string) => void
  ) => {
    setInputModal({
      isOpen: true,
      title,
      label,
      defaultValue,
      onSubmit,
    });
  };

  const openTaskModal = (status: string) => {
    setTaskModal({
      isOpen: true,
      status,
    });
  };

  const openStatusModal = () => {
    setStatusModal((prev) => ({ ...prev, isOpen: true }));
  };

  // Helper functions for closing modals
  const closeConfirmModal = () => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
  };

  const closeInputModal = () => {
    setInputModal((prev) => ({ ...prev, isOpen: false }));
  };

  const closeTaskModal = () => {
    setTaskModal((prev) => ({ ...prev, isOpen: false }));
  };

  const closeStatusModal = () => {
    setStatusModal((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    // States
    confirmModal,
    inputModal,
    taskModal,
    statusModal,

    // Setters
    setConfirmModal,
    setInputModal,
    setTaskModal,
    setStatusModal,

    // Helper functions
    openConfirmModal,
    openInputModal,
    openTaskModal,
    openStatusModal,
    closeConfirmModal,
    closeInputModal,
    closeTaskModal,
    closeStatusModal,
  };
};
