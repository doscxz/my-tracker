import { useState } from 'react';
import Modal from './Modal';

export interface StatusModalState {
  isOpen: boolean;
  handleClose: VoidFunction;
}

interface Props {
  isOpen: boolean;
  handleClose: VoidFunction;
  onSubmit: (status: string) => void;
}

const StatusModal = ({ handleClose, isOpen, onSubmit }: Props) => {
  const [status, setStatus] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status.trim()) {
      onSubmit(status.trim());
      handleClose();
      setStatus('');
    }
  };
  const setStatusTitle = (e: string) => {
    setStatus(e);
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Создание колонки">
      <form onSubmit={handleSubmit} className="space-y-4" data-cy="status-form">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Название колонки *</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatusTitle(e.target.value)}
            placeholder="Введите название статуса"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
            required
            data-cy="status-name-input"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            data-cy="status-modal-cancel-button"
          >
            Отменить
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            data-cy="status-modal-submit-button"
          >
            Создать
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default StatusModal;
