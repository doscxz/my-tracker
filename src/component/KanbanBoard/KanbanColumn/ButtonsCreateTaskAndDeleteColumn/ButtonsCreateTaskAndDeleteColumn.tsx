import CustomButton from '@/shared/CustomButton';

interface Props {
  status: string;
  addNewTask: (status: string) => void;
  deleteColumn: (status: string) => void;
}

const ButtonsCreateTaskAndDeleteColumn = ({ addNewTask, deleteColumn, status }: Props) => {
  const formatedStatus = status.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex gap-2">
      <CustomButton
        className="text-green-500 hover:text-green-600 "
        kind="Borderless"
        label="+ Задача"
        onClick={() => addNewTask(status)}
        data-cy={`add-task-button-${formatedStatus}`}
      />
      <CustomButton
        className="text-red-500 hover:text-red-600"
        kind="Borderless"
        label="✕"
        onClick={() => deleteColumn(status)}
        data-cy={`delete-column-button-${formatedStatus}`}
      />
    </div>
  );
};

export default ButtonsCreateTaskAndDeleteColumn;
