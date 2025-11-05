import type React from 'react';

const TaskCardLoading = () => {
  return (
    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 cursor-move hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm text-gray-600">Загрузка...</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCardLoading;
