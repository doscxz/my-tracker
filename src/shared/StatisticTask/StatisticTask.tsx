import NextImage from 'next/image';
import TitleTaskPage from '@/shared/TitleTaskPage';
import { useState } from 'react';
import EditingField from './EditingField/EditingField';
import { Task } from '@/constant/@type';
import { typedEntries } from '@/helper/typesObjectFunction';
type TranslateDetailsTask = {
  [K in keyof Task['details']]: string;
};
interface Props {
  details: Task['details'];
}

const translateDetailsTask: TranslateDetailsTask = {
  type: 'Тип',
  priority: 'Приоритет',
  tags: 'Тэги',
};

const StatisticTask = ({ details }: Props) => {
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [statisticsValues, setStatisticsValues] = useState({
    type: 'Баг',
    priority: 'Высокий',
    tags: 'frontend, urgent',
  });

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleEdit = (key: string) => {
    setEditingField(key);
  };

  return (
    <div className="flex flex-col">
      <div onClick={toggleContent} className="cursor-pointer">
        <TitleTaskPage isExpanded={isContentVisible}>Детали задачи</TitleTaskPage>
      </div>
      {isContentVisible && (
        <ul className="flex flex-col mt-2 gap-2">
          {typedEntries(details).map(([label, key], index) => (
            <li key={index} className="flex items-center gap-2">
              <strong>{translateDetailsTask[label]}</strong>
              {editingField === key ? (
                <EditingField
                  key={key}
                  statisticsValues={statisticsValues}
                  setStatisticsValues={setStatisticsValues}
                  setEditingField={setEditingField}
                />
              ) : (
                <span
                  onClick={() => handleEdit(key)}
                  className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                  title="Нажмите, чтобы изменить"
                >
                  {statisticsValues[key as keyof typeof statisticsValues]}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatisticTask;
