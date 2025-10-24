import TitleTaskPage from '@/shared/TitleTaskPage';
import Field from './Field';
import { useState } from 'react';

interface Props {
  description: string;
  id: number;
  status: string;
}

const DescriptionTask = ({ description, id, status }: Props) => {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(true);

  const toggleContent = (isVisible?: boolean) => {
    setIsContentVisible(!isVisible);
  };
  return (
    <div>
      <div onClick={() => toggleContent(isContentVisible)} className="cursor-pointer">
        <TitleTaskPage isExpanded={isContentVisible}>Описание</TitleTaskPage>
      </div>
      {isContentVisible && (
        <Field status={status} id={id} value={description} keyField={'description'} />
      )}
    </div>
  );
};

export default DescriptionTask;
