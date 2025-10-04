'use client';

import { useState } from 'react';
import Modal from './Modal';
export interface TaskModalState {
  isOpen: boolean;
  status: string;
}
export type onSubmitTaskModal = (status: string, title: string, description: string) => void;
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: onSubmitTaskModal;
  title: string;
  submitText?: string;
  cancelText?: string;
  status: string;
}

const TaskModal = ({
  status,
  isOpen,
  onClose,
  onSubmit,
  title,
  submitText = 'Создать задачу',
  cancelText = 'Отмена',
}: TaskModalProps) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onSubmit(status, taskTitle.trim(), taskDescription.trim());
      onClose();
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  const handleClose = () => {
    onClose();
    setTaskTitle('');
    setTaskDescription('');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Название задачи *</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Введите название задачи"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Описание задачи</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Введите описание задачи (необязательно)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {submitText}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
