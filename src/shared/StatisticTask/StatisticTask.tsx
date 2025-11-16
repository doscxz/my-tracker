import NextImage from 'next/image';
import TitleTaskPage from '@/shared/TitleTaskPage';
import { useState } from 'react';
import EditingField from '../EditingField/EditingField';
import { Task } from '@/constant/@type';
import { typedEntries } from '@/helper/typesObjectFunction';
import Field from '../Field';
import { observer } from 'mobx-react-lite';
type TranslateDetailsTask = {
  [K in keyof Task['details']]: string;
};
interface Props {
  details: Task['details'];
  id: number;
  status: string;
}

const translateDetailsTask: TranslateDetailsTask = {
  type: 'Тип',
  priority: 'Приоритет',
  tags: 'Метки',
};

const StatisticTask = observer(({ id, details, status }: Props) => {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(true);

  const toggleContent = (isVisible?: boolean) => {
    setIsContentVisible(!isVisible);
  };

  return (
    <div className="flex flex-col">
      <div onClick={() => toggleContent(isContentVisible)} className="cursor-pointer">
        <TitleTaskPage isExpanded={isContentVisible}>Детали задачи</TitleTaskPage>
      </div>
      {isContentVisible && (
        <ul className="flex flex-col mt-2 gap-2">
          {typedEntries(details).map(([key, value]) => (
            <li key={key} className="flex items-center gap-2">
              <strong>{translateDetailsTask[key]}</strong>
              <Field status={status} id={id} value={value} keyField={key} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default StatisticTask;
