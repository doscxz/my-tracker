import { Details, Task } from '@/constant/@type';
import { useStore } from '@/storeMobX/StoreContext';
import { Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react-lite';

interface Props {
  valueDetails: string;
  setEditingField: Dispatch<SetStateAction<string | null>>;
  id: number;
  keyField: keyof Details | keyof Task;
  status: string;
}

const EditingField = observer(({ valueDetails, setEditingField, id, keyField, status }: Props) => {
  const { tasksByStatus } = useStore();

  const handleSave = (valueInput: string) => {
    tasksByStatus.editedFiled({ id, statusTask: status, keyField, value: valueInput });
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
        data-cy={`editing-input-${keyField}-${id}`}
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
        data-cy={`editing-confirm-button-${keyField}-${id}`}
        onClick={() => handleSaveFromInput()}
        className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
      >
        ✓
      </button>
      <button
        data-cy={`editing-cancel-button-${keyField}-${id}`}
        onClick={handleCancel}
        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
      >
        ✗
      </button>
    </div>
  );
});

export default EditingField;
