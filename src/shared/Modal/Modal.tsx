'use client';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-stone-800/50 flex items-center justify-center z-50"
      data-cy="modal-overlay"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4" data-cy="modal-content">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800" data-cy="modal-title">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            data-cy="modal-close-button"
          >
            ×
          </button>
        </div>
        <div className="p-6 max-h-[calc(100vh-250px)] overflow-y-auto" data-cy="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
