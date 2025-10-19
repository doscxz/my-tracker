import { Dispatch, SetStateAction } from 'react';

type StatisticsValues = {
  [key in 'type' | 'priority' | 'tags']: string;
};

interface Props {
  key: string;
  statisticsValues: StatisticsValues;
  setStatisticsValues: Dispatch<SetStateAction<StatisticsValues>>;
  setEditingField: Dispatch<SetStateAction<string | null>>;
}

const EditingField = ({ key, statisticsValues, setStatisticsValues, setEditingField }: Props) => {
  const handleSave = (key: string, value: string) => {
    setStatisticsValues((prev) => ({
      ...prev,
      [key]: value,
    }));
    setEditingField(null);
  };

  const handleSaveFromInput = (key: string) => {
    const input = document.querySelector(`input[data-field="${key}"]`) as HTMLInputElement;
    if (input) {
      handleSave(key, input.value);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
  };
  return (
    <div className="flex items-center gap-1">
      <input
        type="text"
        data-field={key}
        defaultValue={statisticsValues[key as keyof typeof statisticsValues]}
        className="px-2 py-1 border border-gray-300 rounded text-sm"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSave(key, e.currentTarget.value);
          } else if (e.key === 'Escape') {
            handleCancel();
          }
        }}
        autoFocus
      />
      <button
        onClick={() => handleSaveFromInput(key)}
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
