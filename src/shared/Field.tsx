import { useState } from 'react';
import EditingField from './EditingField/EditingField';
import { Details, Task } from '@/constant/@type';

interface Props {
  value: string;
  id: number;
  keyField: keyof Details | keyof Task;
  status: string;
}

const Field = ({ status, id, keyField, value }: Props) => {
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleEdit = (key: string) => {
    setEditingField(key);
  };
  return (
    <>
      {editingField === value ? (
        <EditingField
          id={id}
          status={status}
          keyField={keyField}
          valueDetails={value}
          setEditingField={setEditingField}
        />
      ) : (
        <span
          data-cy={`editable-field-${keyField}-${id}`}
          onClick={() => handleEdit(value)}
          className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
          title="Нажмите, чтобы изменить"
        >
          {value}
        </span>
      )}
    </>
  );
};

export default Field;
