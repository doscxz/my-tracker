import NextImage from 'next/image';
import TitleTaskPage from '@/shared/TitleTaskPage';
import { useState } from 'react';

const statisticsLabels = [
  {
    label: 'Тип:',
  },
  {
    label: 'Приоритет:',
  },
  {
    label: 'Метки:',
  },
];

const StatisticTask = () => {
  const [isContentVisible, setIsContentVisible] = useState(true);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="flex flex-col">
      <div onClick={toggleContent} className="cursor-pointer">
        <TitleTaskPage isExpanded={isContentVisible}>Детали задачи</TitleTaskPage>
      </div>
      {isContentVisible && (
        <ul className="flex flex-col mt-2 gap-2">
          {statisticsLabels.map(({ label }, index) => (
            <li key={index}>
              <strong>{label}</strong>{' '}
              <span title="Нажмите, чтобы изменить">тут можно будет писать</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatisticTask;
