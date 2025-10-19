import { Details } from '@/constant/@type';
import { TasksByStatus, TasksWithoutStatuses } from '@/store/selectors/tasksByStatusSelector';
import { editedFiled } from '@/store/slices/tasksByStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Dispatch, SetStateAction } from 'react';

type StatisticsValues = {
  [key in 'type' | 'priority' | 'tags']: string;
};

interface Props {
  valueDetails: string;
  setEditingField: Dispatch<SetStateAction<string | null>>;
  id: number;
  keyDetails: keyof Details;
  status: string;
}

const EditingField = ({ valueDetails, setEditingField, id, keyDetails, status }: Props) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(TasksWithoutStatuses);
  console.log(tasks);
  const handleSave = (valueInput: string) => {
    dispatch(editedFiled({ id, statusTask: status, keyDetails, value: valueInput }));
    setEditingField(null);
  };

  const handleSaveFromInput = () => {
    const input = document.getElementById(String(id)) as HTMLInputElement;
    if (input) {
      handleSave(input.value);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
  };
  return (
    <div className="flex items-center gap-1">
      <input
        type="text"
        id={String(id)}
        defaultValue={valueDetails}
        className="px-2 py-1 border border-gray-300 rounded text-sm"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSave(e.currentTarget.value);
          } else if (e.key === 'Escape') {
            handleCancel();
          }
        }}
        autoFocus
      />
      <button
        onClick={() => handleSaveFromInput()}
        className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
      >
        ✓
      </button>
      <button
        onClick={handleCancel}
        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
      >
        ✗
      </button>
    </div>
  );
};

export default EditingField;
