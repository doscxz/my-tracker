'use client';

import { useState } from 'react';
import Modal from './Modal';
import { Priority } from '@/constant/@type';
export interface TaskModalState {
  isOpen: boolean;
  status: string;
}

export interface TaskFormData {
  status: string;
  title: string;
  description: string;
  type: string;
  priority: Priority;
  tag: string;
}

export type onSubmitTaskModal = (task: TaskFormData) => void;
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
  const [taskType, setTaskType] = useState('');
  const [taskPriority, setTaskPriority] = useState<Priority | ''>('');
  const [taskTag, setTaskTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() && taskPriority) {
      const taskData: TaskFormData = {
        status,
        title: taskTitle.trim(),
        description: taskDescription.trim(),
        type: taskType.trim(),
        priority: taskPriority,
        tag: taskTag.trim(),
      };
      onSubmit(taskData);
      onClose();
      setTaskTitle('');
      setTaskDescription('');
      setTaskType('');
      setTaskPriority('');
      setTaskTag('');
    }
  };

  const handleClose = () => {
    onClose();
    setTaskTitle('');
    setTaskDescription('');
    setTaskType('');
    setTaskPriority('');
    setTaskTag('');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4" data-cy="task-form">
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
            data-cy="task-title-input"
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
            data-cy="task-description-input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Тип задачи</label>
          <input
            type="text"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            placeholder="Например: Баг, Задача, Улучшение"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-cy="task-type-input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Приоритет</label>
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value as Priority | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-cy="task-priority-select"
          >
            <option value="">Выберите приоритет</option>
            <option value="Низкий">{Priority.LOW}</option>
            <option value="Средний">{Priority.MEDIUM}</option>
            <option value="Высокий">{Priority.HIGH}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Тег</label>
          <input
            type="text"
            value={taskTag}
            onChange={(e) => setTaskTag(e.target.value)}
            placeholder="Например: тест, разработка, дизайн"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-cy="task-tag-input"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            data-cy="task-modal-cancel-button"
          >
            {cancelText}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            data-cy="task-modal-submit-button"
          >
            {submitText}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
